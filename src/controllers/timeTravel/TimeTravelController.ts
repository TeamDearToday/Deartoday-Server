import { NextFunction, Request, Response } from 'express';
import statusCode from '../../modules/statusCode';
import util from '../../modules/util';
import message from '../../modules/responseMessage';
import TimeTravelService from '../../services/timetravel/TimeTravelService';
import { TimeTravelCreateDto } from '../../interfaces/timeTravel/TimeTravelCreateDto';
import TimeTravel from '../../models/TimeTravel';
import { GetTimeTravelDetailDto } from '../../interfaces/timeTravel/GetTimeTravelDetailDto';

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

const getAnswers = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  try {
    const result = await TimeTravelService.getAnswers(userId);
    if (!result) res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));

    res.status(statusCode.OK).send(util.success(statusCode.OK, message.GET_ANSWERS_SUCCESS, result));
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route Get /:timeTravelId
 *  @desc Get TimeTravel Id
 *  @access Public
 */

const getTimeTravelDetail = async (req: Request, res: Response) => {
  const timeTravelId = req.params.timeTravelId;

  try {
    const data = await TimeTravelService.getTimeTravelDetail(timeTravelId);
    if (!data) res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    res.status(statusCode.OK).send(util.success(statusCode.OK, message.GET_TIME_TRAVEL_DETAIL_SUCCESS, data));
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route Get /
 *  @desc Get TimeTravel List
 *  @access Public
 */

const getTimeTravelList = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  try {
    const result = await TimeTravelService.getTimeTravelList(userId);
    if (!result) res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));

    const data = {
      timeTravels: result,
    };
    res.status(statusCode.OK).send(util.success(statusCode.OK, message.GET_TIME_TRAVEL_LIST_SUCCESS, data));
  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

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

  const timeTravelCreateDto: TimeTravelCreateDto = {
    userId: req.body.userId,
    title: req.body.title,
    image: imageFile.location,
    year: req.body.year,
    month: req.body.month,
    day: req.body.day,
    writtenDate: req.body.writtenDate,
    questions: req.body.questions,
    answers: req.body.answers,
  };

  try {
    const data = await TimeTravelService.postTimeTravel(timeTravelCreateDto);
    if (!data) res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_TIMETRAVEL));
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
  getTimeTravelDetail,
};

export default TimeTravelController;
