import slugify from '@sindresorhus/slugify'

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

export const formatCategories = (categories, limit = 4) => {
    if (!categories) {
        return ''
    }

    return categories
        .slice(0, limit)
        .map(c => slugify(c, { decamelize: false, separator: ' ' }))
        .join(`, `)
}

export const isPage = type => type === 'page'
