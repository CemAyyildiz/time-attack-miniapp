import * as yup from 'yup';

// Username validation schema
export const usernameSchema = yup
  .string()
  .required('Kullanıcı adı gereklidir')
  .min(3, 'Kullanıcı adı en az 3 karakter olmalıdır')
  .max(20, 'Kullanıcı adı en fazla 20 karakter olabilir')
  .matches(
    /^[a-zA-Z0-9_-]+$/,
    'Kullanıcı adı sadece harf, rakam, tire ve alt çizgi içerebilir'
  );

// Score validation schema
export const scoreSchema = yup
  .number()
  .required('Skor gereklidir')
  .min(0, 'Skor negatif olamaz')
  .integer('Skor tam sayı olmalıdır');

// Game result validation schema
export const gameResultSchema = yup.object({
  gameId: yup.string().required('Oyun ID gereklidir'),
  score: scoreSchema,
  timestamp: yup.number().required('Zaman damgası gereklidir'),
  success: yup.boolean().required('Başarı durumu gereklidir'),
});
