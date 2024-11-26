export const Button = ({
                           // eslint-disable-next-line react/prop-types
                           children,
                           // eslint-disable-next-line react/prop-types
                           className = '',
                           // eslint-disable-next-line react/prop-types
                           type = 'button',
                           // eslint-disable-next-line react/prop-types
                           color = 'primary'
                       }) => {
    const colorVariants = {
        primary: 'bg-[#6E8F0B] border-[#6E8F0B] text-white',
        secondary: 'bg-[#F5B31C] border-[#F5B31C] text-black'
    };

    return (
        <button
            type={type}cities
            className={`${colorVariants[color]} font-medium sm:py-4 p-3 sm:px-7 px-5 rounded-[40px] border transition-all hover:-translate-y-1 ${className}`}>
            {children}
        </button>
    )
        ;
}