import { NextFunction, Request, Response } from 'express';
import statusCode from '../../modules/statusCode';
import TimeTravelService from '../../services/timetravel/TimeTravelService';
import util from '../../modules/util';
import message from '../../modules/responseMessage';

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
  try {
    const lastAnswers = req.body.message;
    const data = await TimeTravelService.getAnswers(lastAnswers);

    if (!data) {
      return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK, message.GET_ANSWERS_SUCCESS, data));
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
  const { timeTravelId } = req.params;

  try {
    const data = await TimeTravelService.getTimeTravelDetail(timeTravelId);

    res.status(statusCode.OK).send(util.success(statusCode.OK, message.GET_TIME_TRAVEL_DETAIL_SUCCESS));
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
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

const postTimeTravel = async (req: Request, res: Response) => {};

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
