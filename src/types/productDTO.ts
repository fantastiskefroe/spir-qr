export interface ProductDTO {
    id: string;
    title: string;
    handle: string;
    url: string;
    imageUrl: string;
    variants: {
        id: string,
        title: string,
        sku: string,
        price: number
    };
}
