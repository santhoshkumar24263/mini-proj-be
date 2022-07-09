import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import CommentService from "../forum/comment.service";
import CommentModel from "../forum/comment.model";
const rn = require("random-number");


export default class CommentController implements Controller {
  public path = "/forum";
  public router = Router();
  private CommentService = new CommentService();
  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(`${this.path}`, this.addComment);
    this.router.get(`${this.path}`, this.getCommentsList);
    this.router.put(`${this.path}`, this.updateComment);
    this.router.put(`${this.path}/delete`, this.deleteComment);

  }

  private addComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { analyticsID, comment} = req.body;
      const options = {
        min: 12345,
        max: 20000,
        integer: true,
      };
      const comments = new CommentModel();
      comments.analyticsID = analyticsID;
      comments.commentID = rn(options).toString();
      comments.comment = comment;
      comments.creation_date = new Date().toString();
      const createComment = await this.CommentService.addComment(comments);

      res.sendStatus(201);
    } catch (error: any) {
      console.log("C"+error.message);
    }
  };

  private getCommentsList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const comments = await this.CommentService.getCommentsList();
      res.send({ comments });
    } catch (error: any) {
      console.log(error.message);
      //next(new HttpException(400, error.message));
    }
  };

  private updateComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { analyticsID, commentID, comment } = req.body;
      const comments = new CommentModel();
      comments.analyticsID = analyticsID;
      comments.commentID = commentID;
      comments.comment = comment;
      comments.creation_date = new Date().toString();
      const updateComment = await this.CommentService.updateComment(comments);

      res.sendStatus(201);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  private deleteComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const commentID=req.query.commentID;
      const analyticsID= req.query.analyticsID;
      console.log(req.query.commentID);
      const comment = await this.CommentService.deleteComment(analyticsID,commentID);
      res.send({ comment });
    } catch (error: any) {
      console.log(error.message);
      //next(new HttpException(400, error.message));
    }
  };
}
