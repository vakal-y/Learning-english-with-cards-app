export default function Words() {
    let [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/words')
            .then(response => {
                if (response.ok) { // проверяем, что код ответа 200
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then((response) => {
                setWords(response)
                setLoading(false)
            })
            .catch(error => setError(error));
    });


    return (
        <div>
            {loading ?
                (<p>Loading ...</p>)
                :
                (<ol>
                    {
                        words.map(word => {
                            return <li key={word.id}>{word.english} - {word.russian}</li>
                        })
                    }
                </ol>
                )}
        </div>
    )
}