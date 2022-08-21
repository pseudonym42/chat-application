const { User, Message } = require('../../models');
const { UserInputError, AuthenticationError } = require('apollo-server');
const { Op } = require('sequelize');

module.exports = {
    Query: {
        getMessages: async(parent, args, context, info) => {
            let from = args.from;
            let user = context.user;
            try {
                if (!user) throw new AuthenticationError("Not authenticated");
                const otherUser = await User.findOne({
                    where: {username: from}
                })
                if (!otherUser) throw new UserInputError("User <from> not found");
                
                const userNames = [user.username, otherUser.username];

                const messages = await Message.findAll({
                    where: {
                        from: { [Op.in]: userNames },
                        to: { [Op.in]: userNames },
                    },
                    order: [['createdAt', 'DESC']]
                })
                
                return messages;
            } catch(err) {
                console.error(error)
                throw error;
            }
        }
    },
    Mutation: {
        sendMessage: async(parent, args, context, info) => {
            try {
                let user = context.user;
                if (!user) throw new AuthenticationError("Not authenticated");

                const to = await User.findOne({
                    where: {username: args.to}
                })
                if (!to) throw new UserInputError("User <to> not found");

                if (user.username === to.username) {
                    throw new UserInputError("You cannot send message to yourself.");
                }

                if (args.content.trim() === '') {
                    throw new UserInputError("Message cannot be empty");
                }

                const message = await Message.create({
                    from: user.username,
                    to: args.to,
                    content: args.content
                })
                return message;
            } catch(error) {
                console.error(error)
                throw error;
            }
        }
    }
};