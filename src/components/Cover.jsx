

const Cover = ({ img, title, subtitle }) => {
    return (
        <>
            <div className="hero h-[350px] md:h-[500px] mb-14" style={{ backgroundImage: `url(${img})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content cover px-6 md:px-24 py-10 md:py-16 ">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-3xl md:text-5xl font-bold uppercase">{title}</h1>
                        <p className=" text-lg">{subtitle}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cover;