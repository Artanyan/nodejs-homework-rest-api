const updateContact = require("./updateContact")
const listContacts = require("./listContacts")

const updateContactById = async (id, data) => {
    const contacts = await listContacts()
    const idx = contacts.findIndex(item => item.id === id)
    if (idx === -1) {
        return null
    }
    contacts[idx] = { ...contacts[idx], ...data };
    await updateContact(contacts)
    return contacts[idx]
};

module.exports = updateContactById