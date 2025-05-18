import { FC, useEffect, useRef, useState } from 'react';
import { Input } from 'antd';
import type { TextAreaProps } from 'antd/es/input';
import './HighlightedTextarea.scss';

const { TextArea } = Input;

interface HighlightedTextareaProps extends Omit<TextAreaProps, 'onChange'> {
    value?: string;
    onChange?: (value: string) => void;
}

export const HighlightedTextarea: FC<HighlightedTextareaProps> = ({ value = '', onChange, ...rest }) => {
    const [text, setText] = useState<string>(value);
    const preRef = useRef<HTMLPreElement>(null);
    const taRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (preRef.current) {
            preRef.current.innerHTML = highligthInput(text);
        }
    }, [text]);

    const syncScroll = () => {
        if (preRef.current && taRef.current) {
            preRef.current.scrollTop = taRef.current.scrollTop;
            preRef.current.scrollLeft = taRef.current.scrollLeft;
        }
    };

    return (
        <div className="hlta">
            <pre className="hlta__highlighted-text" ref={preRef} />
            <TextArea
                {...rest}
                ref={taRef}
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                    onChange?.(e.target.value);
                }}
                onScroll={syncScroll}
                autoSize={{ minRows: 4 }}
                spellCheck={false}
                className="hlta__textarea"
            />
        </div>
    );
};

export default HighlightedTextarea;

function getSafeString(str: string) {
    return str.replace(/[&<>"'”]/g, (char) => {
        const map: Record<string, string> = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '”': '&#8221;',
        };
        return map[char] || char;
    });
}

function highligthInput(text: string) {
    let result = '';
    let i = 0;

    function isCharChar(char: string) {
        return /[A-Za-z0-9_]/.test(char);
    }

    while (i < text.length) {
        const char = text[i];

        if (char === '"' || char === "'" || char === '”') {
            const quoteType = char;
            let value = char;
            i++;
            while (i < text.length) {
                const c = text[i];
                value += c;
                i++;
                if (c === '\\' && i < text.length) {
                    value += text[i];
                    i++;
                    continue;
                }
                if (c === quoteType) {
                    break;
                }
            }
            result += `<span class="hlta__value">${getSafeString(value)}</span>`;
            continue;
        }

        if (/\s/.test(char)) {
            result += char === '\n' ? '<br />' : char;
            i++;
            continue;
        }

        if (isCharChar(char)) {
            const wordStart = i;
            while (i < text.length && isCharChar(text[i])) {
                i++;
            }
            const word = text.slice(wordStart, i);

            let j = i;
            while(j < text.length && /\s/.test(text[j])) {
                j++;
            }

            if (text[j] === '=') {
                result += `<span class="hlta__key">${getSafeString(word)}</span>`;
                continue;
            }

            if (['AND', 'OR', 'NOT'].includes(word.toUpperCase())) {
                result += `<span class="hlta__operator">${getSafeString(word)}</span>`;
            } else {
                result += getSafeString(word);
            }
            continue;
        }

        result += getSafeString(char);
        i++;
    }

    return result;
}
