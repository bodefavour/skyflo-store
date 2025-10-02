import { supabase } from '../../config/supabase';
import { CreateOrderPayload, Order, OrderItem, PaymentDetails, ShippingAddress } from '../../types/types';

const TABLE_NAME = 'orders';

type RawOrder = Record<string, any>;

const normalizeItems = (items: unknown): OrderItem[] => {
    if (!Array.isArray(items)) {
        return [];
    }
    return items.map((item) => ({
        productId: item.productId ?? item.product_id ?? '',
        quantity: Number(item.quantity ?? 0),
        price: Number(item.price ?? 0),
            name: item.name ?? undefined,
            image: item.image ?? undefined,
    }));
};

const parseShippingAddress = (value: unknown): ShippingAddress | undefined => {
    if (!value || typeof value !== 'object') {
        return undefined;
    }
    const data = value as Record<string, unknown>;
    if (!data.fullName || !data.email || !data.line1 || !data.city) {
        return undefined;
    }
    return {
        fullName: String(data.fullName ?? ''),
        email: String(data.email ?? ''),
        phone: String(data.phone ?? ''),
        line1: String(data.line1 ?? ''),
        line2: data.line2 ? String(data.line2) : undefined,
        city: String(data.city ?? ''),
        state: String(data.state ?? ''),
        postalCode: String(data.postalCode ?? ''),
        country: String(data.country ?? ''),
    };
};

const parsePaymentDetails = (value: unknown): PaymentDetails | undefined => {
    if (!value || typeof value !== 'object') {
        return undefined;
    }
    const data = value as Record<string, unknown>;
    if (!data.method || !data.status) {
        return undefined;
    }
    return {
        method: data.method as PaymentDetails['method'],
        status: data.status as PaymentDetails['status'],
        reference: data.reference ? String(data.reference) : undefined,
    };
};

const mapOrder = (item: RawOrder): Order => ({
    id: item.id,
    customer_name: item.customer_name ?? '',
    email: item.email ?? '',
    phone: item.phone ?? undefined,
    total: Number(item.total ?? 0),
    status: item.status ?? 'pending',
    items: normalizeItems(item.items),
    shipping_address: parseShippingAddress(item.shipping_address),
    payment: parsePaymentDetails(item.payment),
    subtotal: item.subtotal ? Number(item.subtotal) : undefined,
    shipping_fee: item.shipping_fee ? Number(item.shipping_fee) : undefined,
    tax: item.tax ? Number(item.tax) : undefined,
    placed_at: item.placed_at ?? item.created_at ?? undefined,
    created_at: item.created_at ?? undefined,
    updated_at: item.updated_at ?? undefined,
});

export async function fetchOrders(): Promise<Order[]> {
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .order('placed_at', { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return (data ?? []).map(mapOrder);
}

export async function fetchOrdersByStatus(status: string): Promise<Order[]> {
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .eq('status', status)
        .order('placed_at', { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return (data ?? []).map(mapOrder);
}

export async function fetchOrderById(id: string): Promise<Order | null> {
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .eq('id', id)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data ? mapOrder(data) : null;
}

export async function fetchRecentOrders(limit = 5): Promise<Order[]> {
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .order('placed_at', { ascending: false })
        .limit(limit);

    if (error) {
        throw new Error(error.message);
    }

    return (data ?? []).map(mapOrder);
}

export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert({
            customer_name: payload.customer_name,
            email: payload.email,
            phone: payload.phone,
            shipping_address: payload.shipping_address,
            items: payload.items,
            subtotal: payload.subtotal,
            shipping_fee: payload.shipping_fee,
            tax: payload.tax,
            total: payload.total,
            payment: payload.payment,
            status: payload.payment.status === 'paid' ? 'processing' : 'pending',
            notes: payload.notes ?? null,
            placed_at: new Date().toISOString(),
        })
        .select('*')
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return mapOrder(data);
}
