import { NextFunction, Request, Response } from 'express';
import statusCode from '../../modules/statusCode';
import util from '../../modules/util';
import message from '../../modules/responseMessage';
import TimeTravelService from '../../services/timetravel/TimeTravelService';
import { TimeTravelCreateDto } from '../../interfaces/timeTravel/TimeTravelCreateDto';

/**
 *  @route Get /count
 *  @desc Get TimeTravel Count
 *  @access Public
 */

const getTimeTravelCount = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  try {
    const data = await TimeTravelService.getTimeTravelCount(userId);
    if (!data) res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));

    res.status(statusCode.OK).send(util.success(statusCode.OK, message.GET_TIME_TRAVEL_COUNT_SUCCESS, data));
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route Get /oldMedia
 *  @desc Get OldMedia
 *  @access Public
 */

const getOldMedia = async (req: Request, res: Response) => {};

/**
 *  @route Get /question
 *  @desc Get TimeTravel Question
 *  @access Public
 */

const getQuestion = async (req: Request, res: Response) => {
  try {
    const data = await TimeTravelService.getQuestion();
    if (!data) res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));

    res.status(statusCode.OK).send(util.success(statusCode.OK, message.GET_QUESTIONS_SUCCESS, data));
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route Get /answers
 *  @desc Get TimeTravel Answers
 *  @access Public
 */

const getAnswers = async (req: Request, res: Response) => {};

/**
 *  @route Get /:timeTravelId
 *  @desc Get TimeTravel Id
 *  @access Public
 */

const getTimeTravelId = async (req: Request, res: Response) => {
  const { timeTravelId } = req.params;
};

/**
 *  @route Get /
 *  @desc Get TimeTravel List
 *  @access Public
 */

const getTimeTravelList = async (req: Request, res: Response) => {};

/**
 *  @route POST /
 *  @desc Post TimeTravel
 *  @access Public
 */

const postTimeTravel = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  const imageFile: Express.MulterS3.File = req.file as Express.MulterS3.File;
  const { originalname, location } = imageFile;

  const timeTravelCreateDto: TimeTravelCreateDto = {
    userId: req.body.userId,
    title: req.body.title,
    image: imageFile.location,
    year: req.body.year,
    month: req.body.month,
    day: req.body.day,
    currentDate: req.body.currentDate,
    questions: req.body.questions,
    answers: req.body.answers,
  };

  try {
    // const data = await TimeTravelService.postTimeTravel(location, originalname);
    const data = await TimeTravelService.postTimeTravel(timeTravelCreateDto);

    res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_TIMETRAVEL, data));
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

const TimeTravelController = {
  getTimeTravelCount,
  getOldMedia,
  getQuestion,
  postTimeTravel,
  getAnswers,
  getTimeTravelList,
  getTimeTravelId,
};

export default TimeTravelController;
