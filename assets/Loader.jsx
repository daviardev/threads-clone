export const Loader = props => {
    return (
        <svg
            aria-label="Loading..."
            className="animate-spin absolute"
            viewBox="0 0 100 100"
            width={20}
            height={20}
            {...props}
        >
            <rect
                width={28}
                height={10}
                x={67}
                y={45}
                fill="currentColor"
                opacity={0.125}
                rx={5}
                ry={5}
                transform="rotate(-45 50 50)"
            />
            <rect
                width={28}
                height={10}
                x={67}
                y={45}
                fill="currentColor"
                opacity={0.25}
                rx={5}
                ry={5}
            />
            <rect
                width={28}
                height={10}
                x={67}
                y={45}
                fill="currentColor"
                opacity={0.375}
                rx={5}
                ry={5}
                transform="rotate(45 50 50)"
            />
            <rect
                width={28}
                height={10}
                x={67}
                y={45}
                fill="currentColor"
                opacity={0.5}
                rx={5}
                ry={5}
                transform="rotate(90 50 50)"
            />
            <rect
                width={28}
                height={10}
                x={67}
                y={45}
                fill="currentColor"
                opacity={0.625}
                rx={5}
                ry={5}
                transform="rotate(135 50 50)"
            />
            <rect
                width={28}
                height={10}
                x={67}
                y={45}
                fill="currentColor"
                opacity={0.75}
                rx={5}
                ry={5}
                transform="rotate(180 50 50)"
            />
            <rect
                width={28}
                height={10}
                x={67}
                y={45}
                fill="currentColor"
                opacity={0.875}
                rx={5}
                ry={5}
                transform="rotate(225 50 50)"
            />
    </svg>
    )
}