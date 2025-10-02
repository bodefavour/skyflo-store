import { supabase } from '../../config/supabase';
import { Order, OrderItem } from '../../types/types';

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
    }));
};

const mapOrder = (item: RawOrder): Order => ({
    id: item.id,
    customer_name: item.customer_name ?? '',
    email: item.email ?? '',
    phone: item.phone ?? undefined,
    total: Number(item.total ?? 0),
    status: item.status ?? 'pending',
    items: normalizeItems(item.items),
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
