const { DateTime } = require('luxon');
const { v4: uuidv4 } = require('uuid');

const moongoose = require('mongoose');
const Schema = moongoose.Schema;

const storySchema = new Schema({
  title: {type: String, required: [true, 'Title is required']},
  topic: {type: String, required: [true, 'Topic is required']},
  host: {type: String, required: [true, 'Host is required']},
  details: {type: String, required: [true, 'Details is required'], minLength: [10, 'Details must be at least 10 characters']},
  location: {type: String, required: [true, 'Location is required']},
  when: {type: String, required: [true, 'When is required']},
  start: {type: String, required: [true, 'Start is required']},
  end: {type: String, required: [true, 'End is required']},
  image: {type: String, required: [true, 'Image is required']},
},
  {timestamps: true}
);

module.exports = moongoose.model('Story', storySchema);
