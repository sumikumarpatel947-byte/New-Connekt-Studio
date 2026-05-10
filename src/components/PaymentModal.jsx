import { useState, useEffect, memo } from "react";
import { X, CreditCard, Shield, Leaf, Heart, CheckCircle, Loader2 } from "lucide-react";

const PaymentModal = memo(function PaymentModal({ isOpen, onClose, classData, onPaymentSuccess }) {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createOrder = async () => {
    try {
      // Extract numeric value from price string (remove ₹ symbol and any non-numeric chars)
      const priceValue = typeof classData.price === 'string' 
        ? parseInt(classData.price.replace(/[^0-9]/g, '')) 
        : classData.price;
      
      if (!priceValue || isNaN(priceValue)) {
        throw new Error('Invalid price value');
      }
      
      const response = await fetch('https://learnserver-backend.onrender.com/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: priceValue * 100 }) // Razorpay uses paise
      });
      
      const order = await response.json();
      setOrderId(order.id);
      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create payment order. Please try again later.');
      throw error;
    }
  };

  const openRazorpay = (order) => {
    return new Promise((resolve, reject) => {
      if (!window.Razorpay) {
        reject(new Error('Razorpay script not loaded'));
        return;
      }

      const options = {
        key: 'rzp_live_Sm0J6lvif1ikYo',
        amount: order.amount,
        currency: order.currency,
        name: 'Connekt Studio',
        description: 'Class Enrollment',
        order_id: order.id,
        handler: function (response) {
          console.log('Payment successful:', response);
          resolve(response);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#0d9488'
        },
        modal: {
          ondismiss: function () {
            console.log('Payment cancelled by user');
            reject(new Error('Payment cancelled'));
          }
        }
      };

      try {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error('Error opening Razorpay:', error);
        reject(error);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create order on backend
      const order = await createOrder();
      
      // Open Razorpay payment
      const paymentResponse = await openRazorpay(order);
      
      // Verify payment on backend
      const verifyResponse = await fetch('https://learnserver-backend.onrender.com/api/payment/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: paymentResponse.razorpay_order_id,
          razorpay_payment_id: paymentResponse.razorpay_payment_id,
          razorpay_signature: paymentResponse.razorpay_signature
        })
      });
      
      const verifyData = await verifyResponse.json();
      
      if (verifyData.success) {
        // Save enrollment to database
        try {
          const user = localStorage.getItem('user');
          const userData = user ? JSON.parse(user) : null;
          
          await fetch('https://learnserver-backend.onrender.com/api/enrollments/save-enrollment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: userData?._id || null, // Get userId from user object
              classId: classData._id,
              paymentId: paymentResponse.razorpay_payment_id,
              orderId: paymentResponse.razorpay_order_id,
              amount: classData.price
            })
          });
        } catch (error) {
          console.error('Error saving enrollment:', error);
          // Continue even if enrollment save fails - WhatsApp message is already sent
        }

        onPaymentSuccess({
          ...formData,
          classId: classData._id,
          amount: classData.price,
          paymentMethod: paymentMethod,
          paymentId: paymentResponse.razorpay_payment_id,
          orderId: paymentResponse.razorpay_order_id
        });
        onClose();
      } else {
        alert('Payment verification failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      if (error.message !== 'Payment cancelled') {
        alert(`Payment failed: ${error.message || 'Please try again'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-50 via-emerald-50 to-slate-50 shadow-2xl">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-teal-200/40 to-emerald-200/40 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-200/40 to-teal-200/40 blur-3xl" />

          {/* Header */}
          <div className="relative border-b border-teal-100 bg-gradient-to-r from-teal-600 to-emerald-600 p-6 text-white">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <Leaf size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Secure Payment</h2>
                  <p className="text-sm text-white/80">Complete your wellness journey</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="relative p-6">
            {/* Class Summary */}
            <div className="mb-6 rounded-2xl border border-teal-100 bg-white/50 p-4 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <img
                  src={classData.image}
                  alt={classData.title}
                  className="h-20 w-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{classData.title}</h3>
                  <p className="text-sm text-gray-600">{classData.level} • {classData.duration}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-2xl font-bold text-teal-700">₹{classData.price}</span>
                    <span className="text-sm text-gray-500 line-through">₹{Math.round(classData.price * 1.2)}</span>
                    <span className="rounded-full bg-teal-100 px-2 py-1 text-xs font-semibold text-teal-700">
                      20% OFF
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-teal-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-teal-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 9999999999"
                    className="w-full rounded-xl border border-teal-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Address (Optional)
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Your address"
                    className="w-full rounded-xl border border-teal-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  Payment Method
                </label>
                <div className="grid gap-3">
                  <label className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition ${
                    paymentMethod === "razorpay"
                      ? "border-teal-500 bg-teal-50"
                      : "border-teal-200 bg-white hover:border-teal-300"
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={paymentMethod === "razorpay"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="hidden"
                    />
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      paymentMethod === "razorpay" ? "bg-teal-600 text-white" : "bg-teal-100 text-teal-600"
                    }`}>
                      <CreditCard size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Razorpay</p>
                      <p className="text-xs text-gray-500">Cards, UPI, Net Banking, Wallets</p>
                    </div>
                    {paymentMethod === "razorpay" && (
                      <CheckCircle size={20} className="text-teal-600" />
                    )}
                  </label>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center gap-2 rounded-xl border border-teal-100 bg-teal-50 p-3">
                <Shield size={18} className="text-teal-600" />
                <p className="text-xs text-teal-700">
                  Your payment information is secure and encrypted. We use Razorpay for safe transactions.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-4 font-semibold text-white shadow-lg transition hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart size={20} />
                    Pay ₹{classData.price} Securely
                  </>
                )}
              </button>
            </form>

            {/* Footer Note */}
            <p className="mt-4 text-center text-xs text-gray-500">
              By completing this payment, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PaymentModal;
