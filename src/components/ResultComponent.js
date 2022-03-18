export default function Result( { score, text } ) {
    return(
        <div>
            <h5> Your score is { score } </h5>
            <p>{text}</p>
        </div>
    );
};