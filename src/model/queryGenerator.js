const insertGenerator = (sectionName) => {
  const sections = {
    aboutMe: ['user_id', 'likes', 'dislikes',
      'strengths', 'weaknesses', 'uncomfortable', 'safe'],
    symptoms: ['user_id', 'diagnosis', 'diagnosis_agreement',
      'current_medication', 'therapies_helpful', 'keep_well'],
    backgrounds: ['user_id', 'background'],
    appointments: ['user_id', 'worker_preferences',
      'appointment_preferences', 'parent_involved', 'email',
      'mobile', 'telephone', 'contact_preference'],
  };
  const dollars =  sections[sectionName].map( (item, index) => {
    return '$'+(index+1);
  });

  return 'INSERT INTO about_me (' + sections[sectionName].join(', ')+') VALUES ('+
    dollars.join(', ')+') ON CONFLICT (user_id) DO UPDATE SET ('+
    sections[sectionName].slice(1).join(', ')+') = ('+ dollars.slice(1).join(', ')+')';
};

const getGenerator = (sectionName) => {
  return 'SELECT * FROM '+ sectionName +' WHERE user_id = $1';
}

module.exports = { insertGenerator, getGenerator };
