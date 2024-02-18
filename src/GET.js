class GET {
    static async getWords() {
        try {
            const resp = await fetch('http://itgirlschool.justmakeit.ru/api/words');
            return await resp.json();
        }
        catch (e) {
            console.error(e);
            return false
        }
    }
    static async updateWord(id, updatedData) {
        try {
            const resp = await fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            })
            console.log(resp);;

            return await resp.json();
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}

export default GET