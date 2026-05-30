import { useContext, useEffect, useMemo, useState } from "react"
import { MdStar } from "react-icons/md"
import { ShopContext } from "../Context/ShopContext"

const SIZE_OPTIONS = ["S", "M", "L", "XL"];

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart, all_products } = useContext(ShopContext);
    const formattedCategory = product.category
        ? `${product.category.charAt(0).toUpperCase()}${product.category.slice(1)}`
        : "Uncategorized";

    const variantImages = useMemo(() => {
        const matchedProducts = all_products
            .filter((item) => item.name === product.name && item.category === product.category)
            .sort((a, b) => a.id - b.id);
        const uniqueImages = [...new Set(matchedProducts.map((item) => item.image))];
        return uniqueImages.length ? uniqueImages : [product.image];
    }, [all_products, product.category, product.image, product.name]);

    const getImageForSize = (sizeIndex) => variantImages[sizeIndex] || variantImages[0];

    const [selectedSize, setSelectedSize] = useState("S");
    const [selectedImage, setSelectedImage] = useState(getImageForSize(0));

    useEffect(() => {
        const productImageIndex = variantImages.findIndex((image) => image === product.image);
        const defaultSizeIndex = productImageIndex >= 0 && productImageIndex < SIZE_OPTIONS.length ? productImageIndex : 0;
        const defaultSize = SIZE_OPTIONS[defaultSizeIndex];
        setSelectedSize(defaultSize);
        setSelectedImage(getImageForSize(defaultSizeIndex));
    }, [product.id, product.image, variantImages]);

    const handleSizeSelect = (size) => {
        const sizeIndex = SIZE_OPTIONS.indexOf(size);
        setSelectedSize(size);
        setSelectedImage(getImageForSize(sizeIndex));
    };

    return (
        <section>
            <div className="flex flex-col gap-14 xl:flex-row">
                <div className="flex gap-x-2 xl:flex-1">
                    <div className="flex flex-col gap-[7px] flex-wrap">
                        {SIZE_OPTIONS.map((size, index) => (
                            <img key={`${product.id}-preview-${size}`} src={getImageForSize(index)} alt={`${product.name} ${size} preview`} className="max-h-[99px]" />
                        ))}
                    </div>
                    <div>
                        <img src={selectedImage} alt={product.name} />
                    </div>
                </div>
                <div className="flex-col flex xl:flex-[1.7]">
                    <h3 className="h3">{product.name}</h3>
                    <div className="flex gap-x-2 text-secondary medium-22">
                        <MdStar />
                        <MdStar />
                        <MdStar />
                        <MdStar />
                        <p>(111)</p>
                    </div>
                    <div className="flex gap-x-6 medium-28 my-4">
                        <div className="line-through">{product.old_price}</div>
                        <div className="text-secondary">{product.new_price}</div>
                    </div>
                    <div className="mb-4">
                        <h4 className="bold-16">Select Size:</h4>
                        <div className="flex gap-3 my-3">
                            {SIZE_OPTIONS.map((size) => (
                                <button
                                    key={`${product.id}-size-${size}`}
                                    type="button"
                                    onClick={() => handleSizeSelect(size)}
                                    className={`ring-2 h-10 w-10 flexCenter cursor-pointer ${selectedSize === size ? "ring-slate-900" : "ring-slate-900/10"}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-col gap-y-3 mb-4 max-w-[555px]">
                            <button onClick={()=>{addToCart(product.id)}} className="btn_dark_outline !rounded-none uppercase regular-14 tracking-widest">Add to Cart</button>
                            <button className="btn_dark_rounded !rounded-none uppercase regular-14 tracking-widest">Buy it Now</button>
                        </div>
                        <p><span className="medium-16 text-tertiary">Category:</span>{formattedCategory}</p>
                        <p><span className="medium-16 text-tertiary">Tags:</span>Modern | Latest</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDisplay