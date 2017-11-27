const questionText = {
  likes: 'What are some things you like?',
  dislikes: 'Tell us what you don\'t like!',
  strengths: 'What are some of your strengths?',
  weaknesses: 'What would you like to be better at?',
  uncomfortable: 'What makes you feel uncomfortable or anxious?',
  safe: 'What helps you feel safe and calm?',
  diagnosis_options: 'Do you have a mental health diagnosis and if so what is it?',
  diagnosis_agreement: 'Do you agree with your diagnosis?',
  medication: 'Current medication (if any)?',
  therapies_options: 'What therapies have you used?',
  therapies_helpful: 'Did you find those therapies helpful? Why?',
  keep_well: 'What helps you to keep well?',
  background: 'Are there any significant life events that you feel may have contributed to your current difficulties?',
  gender_preference: 'Do you have a preference for your new support worker?',
  time_preference: 'Do you have a preferred appointment time of day?',
  parent_involvement: 'Would you like a parent/guardian at the appointment?',
  email: 'Email:',
  mobile: 'Mobile:',
  telephone: 'Telephone:',
  contact_preference: 'How would you like us to contact you?',
  concerns: 'Do you have any concerns about moving to a new service and if so, what are they?',
  hope: 'I hope that when I leave I am...',
};

const populatePdf = (doc, formData) => {
  doc.fontSize(14);
  Object.keys(formData).forEach((field) => {
    if (questionText[field]) {
        doc.font('Times-Italic')
        .text(`${questionText[field]}`);
      if (formData[`${field}_svg`] && formData[field]) {
          doc.font('Times-Roman')
          .text(formData[field]);
        const dataUri = JSON.parse(formData[`${field}_svg`]).jpg;
        doc.image(dataUri, { width: 300 })
          .text('\n');
      } else if (formData[field]) {
          doc.font('Times-Roman')
          .text(formData[field])
          .text('\n');
      }
    }
  });
};

module.exports = {
  populatePdf,
};
