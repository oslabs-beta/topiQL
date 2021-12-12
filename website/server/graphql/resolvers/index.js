const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const AvroSchema = require('../../models/avro');

const avros = async (schemaIds) => {
  try {
    const avros = await AvroSchema.find({ _id: { $in: schemaIds } });
    avros.map((avro) => {
      return {
        ...avro._doc,
        creator: user.bind(this, avro.creator),
      };
    });
  } catch (err) {
    throw err;
  }
};

const avro = async (schemaId) => {
  try {
    const avro = await AvroSchema.findById(schemaId);
    return {
      ...avro._doc,
      creator: user.bind(this, avro.creator),
    };
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdSchemas: avros.bind(this, user._doc.createdSchemas),
    };
  } catch (err) {
    throw err;
  }
};

const graphqlResolvers = {
  avroSchema: async (args) => {
    try {
      const fetchedSchema = await AvroSchema.findOne({ _id: args.id });
      return fetchedSchema;
    } catch (err) {
      throw err;
    }
  },

  avroSchemas: async () => {
    return AvroSchema.find()
      .then((avros) => {
        console.log(avros);
        return avros.map((avro) => {
          return {
            ...avro._doc,
            creator: user.bind(this, avro._doc.creator),
          };
        });
      })
      .catch((err) => console.error(err.message));
  },

  createSchema: (args) => {
    const avro = new AvroSchema({
      topic: args.schemaInput.topic,
      avro: args.schemaInput.avro,
      // graphql: args.schemaInput.graphql,
      creator: '61b53f5aff9686a42478072f',
    });
    let createdSchema;

    return avro
      .save()
      .then((result) => {
        console.log('result--->', result);
        createdSchema = {
          ...result._doc,
          creator: user.bind(this, result._doc.creator),
        };
        return User.findById('61b53f5aff9686a42478072f');
      })
      .then((user) => {
        console.log('user--->', user);
        if (!user) {
          throw new Error('User not found.');
        }
        user.createdSchemas.push(createdSchema);
        return user.save();
      })
      .then((result) => {
        return createdSchema;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },

  createUser: async (args) => {
    return User.findOne({ username: args.userInput.username })
      .then((user) => {
        if (user) {
          throw new Error('User exists already.');
        }
        return bcrypt.hash(args.userInput.password, 10);
      })
      .then((hashedPassword) => {
        const user = new User({
          username: args.userInput.username,
          email: args.userInput.email,
          password: hashedPassword,
        });
        return user.save();
      })
      .then((result) => {
        console.log(result);
        return { ...result._doc, password: null, _id: result.id };
      })
      .catch((err) => {
        console.error(err.message);
        throw err;
      });
  },
};

module.exports = graphqlResolvers;