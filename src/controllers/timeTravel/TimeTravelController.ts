import { NextFunction, Request, Response } from 'express';
import statusCode from '../../modules/statusCode';
import TimeTravelService from '../../services/timetravel/TimeTravelService';

/**
 *  @route Get /count
 *  @desc Get TimeTravel Count
 *  @access Public
 */

const getTimeTravelCount = async (req: Request, res: Response) => {
  const user = req.body.user;
  try {
    const data = await TimeTravelService.getTimeTravelCount(userId);
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

const getQuestion = async (req: Request, res: Response) => {};

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

const postTimeTravel = async (req: Request, res: Response) => {};

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
