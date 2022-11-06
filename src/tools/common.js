
function isValidOperation(updates, allowedUpdates) {
    return updates.every( (update) => allowedUpdates.includes(update) )
}

module.exports = { isValidOperation }