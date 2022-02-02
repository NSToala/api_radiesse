import Analytic from "../models/Analytic";

export const getAnalyticsById = async (req, res) => {
  const { uid, course, name } = req.body;
  const count = await Analytic.find({course_id: course, user_id: uid}).sort({_id:-1}).limit(1)
  let response = {}
  
  if(count.length === 0) {
    const newAnalytic = new Analytic({ name , current: 0, course_id: course, user_id: uid })
    const data = await newAnalytic.save()
    response = data.current
  }else {
    response = count[0].current
  }
  
  res.status(200).json({ current: response });
};

export const updateAnalytic = async (req, res) => {
  const { uid, course, name, current } = req.body;  
  const newAnalytic = new Analytic({ name , current, course_id: course, user_id: uid })
  
  await newAnalytic.save()
  
  res.status(200).json( { message: "tracking update" });
};
