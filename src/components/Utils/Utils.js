const Utils = () => {
    const change = (e, field) => {
        setUser(current => {
            return { ...current, [field]: e.target.value }
        })
    }
}

export default Utils;