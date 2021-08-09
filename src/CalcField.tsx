import { TextField } from '@material-ui/core'
import { ChangeEvent, UIEvent, useRef, useState } from 'react'
import BigMath, { evaluate } from './utils/BigMath';

function getTextWidth(text: string, font?: string) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (context) {
        context.font = font || getComputedStyle(document.body).font;
        return context.measureText(text).width;
    }

    return 0;
}

type CalcFieldProps = {
    value: string,
    onChange: (value: string) => void
};

const CalcField = (props: CalcFieldProps) => {
    const inputField = useRef<HTMLTextAreaElement>();
    const outputField = useRef<HTMLTextAreaElement>();
    const [calc, setCalc] = useState(props.value ?? '');
    let scope = {};

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCalc(event.target.value);

        if (props.onChange)
            props.onChange(event.target.value);
    };

    const handleScroll = (event: UIEvent<HTMLTextAreaElement>) => {
        if (inputField.current && outputField.current) {
            outputField.current.scrollTop = inputField.current.scrollTop;
        }
    };

    const answers = calc.split(/\r?\n/).map((line) => {
        let ans = '';
        let exp = line;

        if (exp.length && !exp.startsWith('//') && BigMath.evaluate) {
            ans = evaluate(exp, scope);
        }

        return line + ' = ' + ans;
    }).join('\n');

    return (
        <div style={{ height: '100%', display: 'flex' }}>
            <TextField
                style={{ width: '50%', height: '100%' }}
                autoFocus
                multiline
                label="Calculation"
                placeholder="x = 5..."
                value={calc}
                onChange={handleChange}
                inputRef={inputField}
                inputProps={{ onScroll: handleScroll, style: { width: '100%', height: '100%', overflow: 'auto' } }}
                InputProps={{ style: { width: '100%', height: '100%' } }}
                variant="outlined"></TextField>
            <TextField
                style={{ flex: '1 1 auto', marginLeft: '10px' }}
                multiline
                label="Answers"
                variant="outlined"
                value={answers}
                inputRef={outputField}
                InputProps={{ style: { width: '100%', height: '100%' } }}
                inputProps={{ readOnly: true, style: { width: '100%', height: '100%' } }}></TextField>
        </div>
    )
}

export default CalcField
