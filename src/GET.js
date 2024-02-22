class GET {
    static async getWords() {
        try {
            const resp = await fetch('/api/words');
            return await resp.json();
        }
        catch (e) {
            console.error(e);
            return false
        }
    }
    static async updateWord(id, updatedData) {
        try {
            const resp = await fetch(`/api/words/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            })
            console.log(resp);
            const data = await resp.json();
            return data;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}

export default GET