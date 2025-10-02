import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchOrderById } from '../../services/api/orders.service';
import type { Order } from '../../types/types';
import { useLocale } from '../../context/LocaleContext';

interface LocationState {
    order?: Order;
}

const OrderConfirmationPage: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const state = (location.state as LocationState | undefined) ?? {};
    const [order, setOrder] = useState<Order | null>(state.order ?? null);
    const [loading, setLoading] = useState(!state.order);
    const [error, setError] = useState<string | null>(null);
    const { formatCurrency } = useLocale();

    useEffect(() => {
        let active = true;

        const loadOrder = async () => {
            if (state.order) return;
            if (!orderId) {
                setError('Order not found.');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const fetched = await fetchOrderById(orderId);
                if (!active) return;
                if (!fetched) {
                    setError('We could not locate this order.');
                } else {
                    setOrder(fetched);
                }
            } catch (err) {
                if (!active) return;
                setError(err instanceof Error ? err.message : 'Unable to load your order.');
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        loadOrder();

        return () => {
            active = false;
        };
    }, [orderId, state.order]);

    const totals = useMemo(() => {
        if (!order) {
            return null;
        }

        const subtotal = order.subtotal ?? order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = order.shipping_fee ?? Math.max(order.total - subtotal - (order.tax ?? 0), 0);
        const tax = order.tax ?? Math.max(order.total - subtotal - shipping, 0);
        return {
            subtotal,
            shipping,
            tax,
            total: order.total,
        };
    }, [order]);

    if (loading) {
        return (
            <section className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
                <p className="text-white/60">Retrieving your order…</p>
            </section>
        );
    }

    if (error || !order) {
        return (
            <section className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6 text-center space-y-6">
                <p className="text-lg font-medium text-red-300">{error ?? 'Unable to locate your order.'}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="bg-[#d4af37] hover:bg-[#c99b3f] text-black px-6 py-3 rounded-full font-semibold transition"
                    >
                        Return home
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/cart')}
                        className="border border-white/20 hover:border-white/40 px-6 py-3 rounded-full"
                    >
                        Back to cart
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-[#050505] text-white py-16">
            <div className="max-w-5xl mx-auto px-6 lg:px-10 space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="rounded-3xl border border-white/10 bg-[#0c0c0c]/80 p-6 sm:p-10 backdrop-blur"
                >
                    <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-[#d4af37]">Order confirmed</p>
                            <h1 className="text-3xl sm:text-4xl font-light mt-2">Thank you, {order.customer_name || 'Skyflo friend'}!</h1>
                            <p className="text-white/60 mt-4 text-sm sm:text-base">
                                Your order has been received and our team will start preparing it immediately.
                                We'll notify you at {order.email} once it's on its way.
                            </p>
                        </div>
                        <div className="rounded-2xl bg-white/5 border border-white/10 px-6 py-4 text-sm text-white/70">
                            <p className="uppercase tracking-[0.3em] text-xs text-white/50">Order number</p>
                            <p className="text-lg font-semibold text-white mt-1">{order.id}</p>
                            <p className="text-xs text-white/40 mt-2">Placed {order.placed_at ? new Date(order.placed_at).toLocaleString() : 'just now'}</p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="rounded-3xl border border-white/10 bg-[#0c0c0c]/80 p-6 sm:p-8 backdrop-blur"
                    >
                        <h2 className="text-lg font-semibold mb-6">Items in your order</h2>
                        <div className="space-y-6">
                            {order.items.map((item) => (
                                <div key={`${item.productId}-${item.price}`} className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/5 flex-shrink-0">
                                        <img
                                            src={item.image || '/images/placeholder.jpg'}
                                            alt={item.name ?? `Product ${item.productId}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-white/90">{item.name ?? `Product #${item.productId}`}</p>
                                        <p className="text-white/50 text-sm">Quantity: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium text-[#d4af37]">{formatCurrency(item.price * item.quantity)}</p>
                                </div>
                            ))}
                        </div>

                        {totals && (
                            <div className="border-t border-white/10 mt-6 pt-4 space-y-3 text-sm text-white/60">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>{formatCurrency(totals.subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>{totals.shipping > 0 ? formatCurrency(totals.shipping) : 'Free'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>{formatCurrency(totals.tax)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Total paid</span>
                                    <span>{formatCurrency(totals.total)}</span>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    <motion.aside
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="rounded-3xl border border-white/10 bg-[#0c0c0c]/80 p-6 sm:p-8 space-y-6 backdrop-blur"
                    >
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Delivery to</h3>
                            {order.shipping_address ? (
                                <address className="not-italic text-white/70 text-sm leading-relaxed">
                                    <strong className="text-white/90">{order.shipping_address.fullName}</strong>
                                    <br />
                                    {order.shipping_address.line1}
                                    {order.shipping_address.line2 && (
                                        <>
                                            <br />
                                            {order.shipping_address.line2}
                                        </>
                                    )}
                                    <br />
                                    {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postalCode}
                                    <br />
                                    {order.shipping_address.country}
                                    <br />
                                    {order.shipping_address.phone}
                                </address>
                            ) : (
                                <p className="text-white/60 text-sm">Shipping details will be confirmed with our concierge team.</p>
                            )}
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Payment</h3>
                            <p className="text-white/60 text-sm">
                                Method: {order.payment?.method === 'cod' ? 'Cash on delivery' : order.payment?.method === 'bank' ? 'Bank transfer' : 'Card payment'}
                            </p>
                            <p className="text-white/60 text-sm">
                                Status: <span className="text-white/80 capitalize">{order.payment?.status ?? order.status}</span>
                            </p>
                        </div>

                        <div className="pt-4 border-t border-white/10 space-y-3 text-sm">
                            <Link
                                to="/account"
                                className="block rounded-full border border-white/20 px-4 py-3 text-center hover:border-white/40 transition"
                            >
                                Manage account
                            </Link>
                            <Link
                                to="/collections"
                                className="block rounded-full bg-[#d4af37] text-black px-4 py-3 text-center font-semibold hover:bg-[#c99b3f] transition"
                            >
                                Continue shopping
                            </Link>
                        </div>
                    </motion.aside>
                </div>
            </div>
        </section>
    );
};

export default OrderConfirmationPage;
