declare module '@heroicons/react/outline' {
    import { ComponentType, SVGProps } from 'react';

    // Existing exports
    export const XIcon: ComponentType<SVGProps<SVGSVGElement>>;
    export const SearchIcon: ComponentType<SVGProps<SVGSVGElement>>;
    export const ShoppingBagIcon: ComponentType<SVGProps<SVGSVGElement>>;
    export const MenuIcon: ComponentType<SVGProps<SVGSVGElement>>;
    export const ArrowLeftIcon: ComponentType<SVGProps<SVGSVGElement>>;

    // Newly added exports required by components
    export const GlobeAltIcon: ComponentType<SVGProps<SVGSVGElement>>;
    export const UserCircleIcon: ComponentType<SVGProps<SVGSVGElement>>;
}