const test = require('tape');
const dbReset = require('../../src/model/database/db_seed');
const { getForm } = require('../../src/model/form_queries');

test('Get form from database', (t) => {
  // TODO hardcoding id may be brittle
  const expected = {
    id: 1,
    user_id: 1,
    likes: 'choccies',
    dislikes: 'rain and thunder',
    strengths: 'being super duper',
    weaknesses: 'nothing!',
    uncomfortable: 'uncertainty',
    safe: 'bathing in jam',
    gender_preference: 'male',
    time_preference: 'am',
    parent_involvement: 'no',
    email: '',
    mobile: '091290382904',
    telephone: null,
    contact_preference: '{text,email}',
    concerns: null,
    hope: null,
    diagnosis_options: '{schizophrenia,depression}',
    diagnosis_other: null,
    diagnosis_agreement: 'no',
    medication: 'none',
    therapies_options: '{talking therapies}',
    therapies_other: null,
    therapies_helpful: null,
    keep_well: 'running',
    background: 'i went for a walk when i was born',
    additional_info: null,
  };

  dbReset()
    .then(() =>
      getForm(1))
    .then((formObj) => {
      t.deepEqual(formObj, expected, 'Returns correct object');
      t.end();
    });
});
