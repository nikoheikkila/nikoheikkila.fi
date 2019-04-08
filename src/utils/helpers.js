export const formatReadingTime = minutes => {
    const cups = Math.round(minutes / 5)
    if (cups > 5) {
        return `${new Array(Math.round(cups / Math.E))
            .fill('🍱')
            .join('')} ${minutes} minutes read`
    }

    return `${new Array(cups || 1)
        .fill('☕️')
        .join('')} ${minutes} min read`
}

export const formatCategories = (categories, limit = 3) => categories
    .slice(0, limit)
    .map(c => `#${c.toLowerCase()}`)
    .join(`, `)
