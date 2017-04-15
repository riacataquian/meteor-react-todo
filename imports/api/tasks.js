import { Mongo } from 'meteor/mongo'

// We will be putting collections here
// and we will add publications that read from them
// and "methods" that write to them.
export const Tasks = new Mongo.Collection('tasks')
