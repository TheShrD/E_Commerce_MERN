const ProductDescription = () => {
    return (
        <div className="mt-20">
            <div className="flex gap-3 mb-4">
                <button className="btn_dark_rounded !rounded-none !text-xs !py-[6px] w-36">Description</button>
                <button className="btn_dark_outline !rounded-none !text-xs !py-[6px] w-36">Care Guide</button>
                <button className="btn_dark_outline !rounded-none !text-xs !py-[6px] w-36">Size Guide</button>
            </div>
            <div className="flex flex-col pb-16">
                <p className="text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti possimus minus sapiente magnam vitae aut perspiciatis iure nemo iusto cupiditate asperiores, placeat earum repudiandae blanditiis ex sint quod ipsa dolorem. Saepe explicabo ullam temporibus tempora magni reprehenderit totam repellendus inventore dolore accusamus doloribus esse libero vitae voluptatum, repellat deserunt dignissimos doloremque. Reiciendis est quisquam earum?</p>
                <p className="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est architecto quas tenetur a provident, ducimus sunt quidem alias nostrum facilis autem nesciunt, cupiditate eaque atque, fuga quis placeat.</p>
            </div>
        </div>
    )
}

export default ProductDescription