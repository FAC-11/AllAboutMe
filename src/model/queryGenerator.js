// const update = 'INSERT INTO about_me (user_id, likes, dislikes, \
//   strengths, weaknesses, uncomfortable, safe) VALUES \
//   ($7, $1, $2, $3, $4, $5, $6) ON CONFLICT \
//   (user_id) DO UPDATE SET (likes, dislikes, strengths, \
//     weaknesses, uncomfortable, safe) = ($1, $2, $3, $4, $5, $6)',

const aboutMe = ['user_id', 'likes', 'dislikes',
  'strengths', 'weaknesses', 'uncomfortable', 'safe'];

const symptoms = ['user_id', 'diagnosis', 'diagnosis_agreement',
   'current_medication', 'therapies_helpful', 'keep_well'];

const backgrounds = ['user_id', 'background'];

const appointments = ['user_id', 'worker_preferences',
  'appointment_preferences', 'parent_involved', 'email',
  'mobile', 'telephone', 'contact_preference'];



const queryGenerator = (array) => {
  const dollars =  array.map( (item, index) => {
    return '$'+(index+1);
  });

  const query = 'INSERT INTO about_me (' + array.join(', ')+') VALUES ('+ dollars.join(', ')+') ON CONFLICT (user_id) DO UPDATE SET ('+array.slice(1).join(', ')+') = ('+dollars.slice(1).join(', ')+')';

  return query;
}

module.exports = queryGenerator;
