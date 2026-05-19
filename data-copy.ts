import type { AttributePlugin } from 'datastar/library/src/engine/types'

if (typeof window !== 'undefined') {
    (async () => {
        try {
            // @ts-ignore - datastar may be available via importmap at runtime
            const datastar = await import('datastar')
            if (datastar?.attribute) {
                copyPlugin(datastar.attribute)
            }
        } catch (e) {
            // Datastar not available via importmap.
            // Consumer must register manually.
        }
    })()
}

export default function copyPlugin(attribute: (plugin: AttributePlugin) => void): void {
    attribute({
        name: 'copy',
        requirement: {
            value: 'must',
        },
        apply({ el, value }) {
            let timeoutId: ReturnType<typeof setTimeout> | undefined;

            // function to handle click event
            const handleClick = () => {
                // Find the source element via the selector
                const source = document.querySelector(value as string);
                if (!source) {
                    return;
                }
                const text = source.textContent ?? '';
                navigator.clipboard.writeText(text).then(() => {
                    const originalText = el.textContent
                    if (timeoutId) {
                        clearTimeout(timeoutId)
                    }
                    el.textContent = '\u2714 Copied'
                    timeoutId = setTimeout(() => {
                        el.textContent = originalText
                    }, 2000)
                })
            }

            el.addEventListener('click', handleClick);

            return () => {
                el.removeEventListener('click', handleClick);
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            }
        }
    })
}