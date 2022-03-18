export function FirstQuestion( { onChange, setAnswer, answer } ) {
    return(
        <div>
            <h5>
                What is the official language of Brazil?
            </h5>
            <input id="language" onKeyPress={setAnswer} onChange={onChange} value={answer} type="text" placeholder="Your answer"/>
        </div>
    );
};

export function SecondQuestion({ data, onChange }) {
    return(
        <div>
            <h5>
                What is the capital of Hungary?
            </h5>
            <div className="question-container">
                {data.map(({ id, label}, index) => (
                <div className="label-input" key={id}>
                    <label
                     htmlFor={label}>{label}</label>
                    <input onChange={onChange} name="capital" id={label} type="radio" value={index} />   
                </div>
                ))}
            </div>
        </div>
    );
};

export function ThirdQuestion({ data, onChange }) {
    return(
        <div>
            <h5>
                Select US States.
            </h5>
            <div className="question-container">
                {data.map(({ id, value, label}) => (
                <div className="label-input" key={id}>
                    <label 
                        htmlFor={label}>
                        {label}
                    </label>
                    <input onChange={onChange} name="capital" id={label} type="checkbox" value={value} />   
                </div>
                ))}
            </div>
        </div>
    );
};