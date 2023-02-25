import ProductType from "./product";

export default interface ShopType {
	id: number;
	name: string
    email: string
	password: string
	 address: string
     img:string
	 products:ProductType[]
}