import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../services/api/orders.service';
import type { CreateOrderPayload, ShippingAddress, PaymentDetails } from '../../types/types';

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  line1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  paymentMethod?: string;
}

const defaultAddress: ShippingAddress = {
  fullName: '',
  email: '',
  phone: '',
  line1: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'United States',
};

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [address, setAddress] = useState<ShippingAddress>(defaultAddress);
  const [addressLine2, setAddressLine2] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentDetails['method']>('card');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const totals = useMemo(() => {
    const subtotal = getCartTotal();
    const shippingFee = subtotal >= 250 ? 0 : 15;
    const tax = subtotal * 0.08;
    const total = subtotal + shippingFee + tax;

    return {
      subtotal,
      shippingFee,
      tax,
      total,
    };
  }, [cartItems, getCartTotal]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!address.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!address.email.trim()) newErrors.email = 'Email address is required.';
    if (!address.phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!address.line1.trim()) newErrors.line1 = 'Address line is required.';
    if (!address.city.trim()) newErrors.city = 'City is required.';
    if (!address.state.trim()) newErrors.state = 'State/Region is required.';
    if (!address.postalCode.trim()) newErrors.postalCode = 'Postal code is required.';
    if (!address.country.trim()) newErrors.country = 'Country is required.';
    if (!paymentMethod) newErrors.paymentMethod = 'Select a payment method.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof ShippingAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    if (cartItems.length === 0) {
      setSubmitError('Your cart is empty. Add items before checking out.');
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const shippingAddress: ShippingAddress = {
        ...address,
        line2: addressLine2 || undefined,
      };

      const payment: PaymentDetails = {
        method: paymentMethod,
        status: paymentMethod === 'cod' ? 'pending' : 'paid',
        reference: `SKY-${Date.now()}`,
      };

      const payload: CreateOrderPayload = {
        customer_name: shippingAddress.fullName,
        email: shippingAddress.email,
        phone: shippingAddress.phone,
        shipping_address: shippingAddress,
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
          image: item.image,
        })),
        subtotal: totals.subtotal,
        shipping_fee: totals.shippingFee,
        tax: totals.tax,
        total: totals.total,
        payment,
        notes: notes.trim() || undefined,
      };

      const order = await createOrder(payload);
      clearCart();
      navigate(`/order-confirmation/${order.id}`, { state: { order } });
    } catch (error) {
      console.error('Failed to place order', error);
      setSubmitError(error instanceof Error ? error.message : 'Unable to complete checkout.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <section className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-3xl font-semibold">Your cart is empty</h1>
          <p className="text-white/60">Add a few of your favourite pieces before proceeding to checkout.</p>
          <button
            type="button"
            onClick={() => navigate('/collections')}
            className="bg-[#d4af37] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#c99b3f] transition"
          >
            Browse collections
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#050505] text-white py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row">
          <motion.form
            onSubmit={handleSubmit}
            className="flex-1 bg-[#0c0c0c]/80 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <header className="space-y-2">
              <p className="text-sm uppercase tracking-[0.3em] text-[#d4af37]">Checkout</p>
              <h1 className="text-3xl sm:text-4xl font-light">Shipping details</h1>
              <p className="text-white/50 text-sm">We use your information to prepare your order and send updates.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">Full name</label>
                <input
                  type="text"
                  value={address.fullName}
                  onChange={(event) => handleChange('fullName', event.target.value)}
                  className="w-full rounded-2xl bg-[#151515] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                />
                {errors.fullName && <p className="text-sm text-red-400">{errors.fullName}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">Email address</label>
                <input
                  type="email"
                  value={address.email}
                  onChange={(event) => handleChange('email', event.target.value)}
                  className="w-full rounded-2xl bg-[#151515] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                />
                {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">Phone</label>
                <input
                  type="tel"
                  value={address.phone}
                  onChange={(event) => handleChange('phone', event.target.value)}
                  className="w-full rounded-2xl bg-[#151515] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                />
                {errors.phone && <p className="text-sm text-red-400">{errors.phone}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">Address line 1</label>
                <input
                  type="text"
                  value={address.line1}
                  onChange={(event) => handleChange('line1', event.target.value)}
                  className="w-full rounded-2xl bg-[#151515] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                />
                {errors.line1 && <p className="text-sm text-red-400">{errors.line1}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">Address line 2</label>
                <input
                  type="text"
                  value={addressLine2}
                  onChange={(event) => setAddressLine2(event.target.value)}
                  className="w-full rounded-2xl bg-[#151515] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                  placeholder="Apartment, suite, etc. (optional)"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">City</label>
                <input
                  type="text"
                  value={address.city}
                  onChange={(event) => handleChange('city', event.target.value)}
                  className="w-full rounded-2xl bg-[#151515] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                />
                {errors.city && <p className="text-sm text-red-400">{errors.city}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">State / Region</label>
                <input
                  type="text"
                  value={address.state}
                  onChange={(event) => handleChange('state', event.target.value)}
                  className="w-full rounded-2xl bg-[#151515] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                />
                {errors.state && <p className="text-sm text-red-400">{errors.state}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">Postal code</label>
                <input
                  type="text"
                  value={address.postalCode}
                  onChange={(event) => handleChange('postalCode', event.target.value)}
                  className="w-full rounded-2xl bg-[#151515] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                />
                {errors.postalCode && <p className="text-sm text-red-400">{errors.postalCode}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">Country</label>
                <input
                  type="text"
                  value={address.country}
                  onChange={(event) => handleChange('country', event.target.value)}
                  className="w-full rounded-2xl bg-[#151515] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                />
                {errors.country && <p className="text-sm text-red-400">{errors.country}</p>}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs uppercase tracking-[0.3em] text-white/50">Delivery notes</label>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={4}
                className="w-full rounded-2xl bg-[#151515] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] resize-none"
                placeholder="Optional instructions for your delivery"
              />
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Payment method</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['card', 'bank', 'cod'] as PaymentDetails['method'][]).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => {
                      setPaymentMethod(method);
                      setErrors((prev) => ({ ...prev, paymentMethod: undefined }));
                    }}
                    className={`rounded-2xl border px-4 py-4 text-sm font-medium transition ${
                      paymentMethod === method
                        ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]'
                        : 'border-white/10 bg-[#151515] text-white/70 hover:border-white/30'
                    }`}
                  >
                    {method === 'card' && 'Card payment'}
                    {method === 'bank' && 'Bank transfer'}
                    {method === 'cod' && 'Pay on delivery'}
                  </button>
                ))}
              </div>
              {errors.paymentMethod && <p className="text-sm text-red-400">{errors.paymentMethod}</p>}
            </div>

            {submitError && (
              <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {submitError}
              </div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isSubmitting}
              className="w-full bg-[#d4af37] hover:bg-[#c99b3f] text-black py-4 rounded-full font-semibold text-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing order…' : 'Place order securely'}
            </motion.button>
          </motion.form>

          <aside className="w-full lg:w-[340px] space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#0c0c0c]/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur"
            >
              <h2 className="text-lg font-semibold mb-4">Order summary</h2>
              <div className="space-y-4 text-sm">
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/5">
                        <img
                          src={item.image || '/images/placeholder.jpg'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-white/90">{item.name}</p>
                        <p className="text-white/50">Qty {item.quantity}</p>
                      </div>
                      <p className="font-medium text-[#d4af37]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4 space-y-3 text-white/70">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{totals.shippingFee === 0 ? 'Free' : `$${totals.shippingFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${totals.tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 flex justify-between text-base font-semibold">
                  <span>Total due</span>
                  <span>${totals.total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#0c0c0c]/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur"
            >
              <h3 className="text-lg font-semibold mb-3">Why shop with Skyflo?</h3>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#d4af37]" />
                  Complimentary gift wrapping on every order
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#d4af37]" />
                  Secure payments backed by encrypted processing
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#d4af37]" />
                  Dedicated concierge team for custom orders
                </li>
              </ul>
            </motion.div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
