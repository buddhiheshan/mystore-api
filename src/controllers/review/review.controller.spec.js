const ReviewController = require("./review.controller");
const ItemController = require("../item/item.controller");
const interceptor = require("../../../__mocks__/interceptor");
const ConflictException = require("../../common/exceptions/ConflictException");

const existingReviews = [{
    id: 1,
    itemId: 1,
    "description": "existing description",
    "rating": 1
}, {
    id: 1,
    itemId: 1,
    "description": "existing description",
    "rating": 1
}]

const existingItem = {
    id: 1,
    name: "existing item"
}

describe("Review Controller", () => {
    describe('postReviewHandler', () => {
        it("should fail if itemId is invalid", async () => {
            const reviewController = new ReviewController();
            const itemService = reviewController.itemService;

            const req = interceptor.mockRequest();
            const res = interceptor.mockResponse();
            const next = interceptor.mockNext();

            req.body = {
                "description": "mock description",
                "rating": 1
            }
            req.params = {
                itemId: 1
            }

            itemService.getItemByID.mockReturnValue();
            await reviewController.postReviewHandler()(req, res, next);
            expect(itemService.getItemByID.mock.calls.length).toBe(1);
            expect(itemService.getItemByID.mock.calls[0][0]).toBe(req.params.itemId);
            expect(itemService.getItemByID.mock.results[0].value).toBe();

            const expected = new ConflictException();
            expect(next).toHaveBeenCalledWith(expected);
        });
        it("should bind the review to the response", async () => {
            const reviewController = new ReviewController;
            const reviewService = reviewController.reviewService;
            const itemService = reviewController.itemService;

            const req = interceptor.mockRequest();
            const res = interceptor.mockResponse();
            const next = interceptor.mockNext();

            req.body = {
                "description": "mock description",
                "rating": 1
            }
            req.params = {
                itemId: 1
            }
            req.user = {
                user_id: 1
            }

            itemService.getItemByID.mockReturnValueOnce(existingItem)
            reviewService.postReview.mockReturnValueOnce(req.body);
            await reviewController.postReviewHandler()(req, res, next);

            expect(reviewService.postReview.mock.calls.length).toBe(1);;
            expect(reviewService.postReview.mock.calls[0][0]).toBe(req.params.itemId);
            expect(reviewService.postReview.mock.calls[0][1]).toBe(req.user.user_id);
            expect(reviewService.postReview.mock.calls[0][2]).toBe(req.body);
            expect(reviewService.postReview.mock.results[0].value).toBe(req.body);

            expect(res.status.mock.calls.length).toBe(1)
            expect(res.status.mock.calls[0][0]).toBe(201)
            expect(res.json.mock.calls.length).toBe(1)
            expect(res.body.success).toBe(true)
            expect(res.body.data).toBe(req.body)
        });
    });
    describe('getAllReviewsHandler', () => {
        it("should fail if itemId is invalid", async () => {
            const reviewController = new ReviewController();
            const itemService = reviewController.itemService;

            const req = interceptor.mockRequest();
            const res = interceptor.mockResponse();
            const next = interceptor.mockNext();

            req.body = {
                "description": "mock description",
                "rating": 1
            }
            req.params = {
                itemId: 1
            }

            itemService.getItemByID.mockReturnValue();
            await reviewController.getAllReviewsHandler()(req, res, next);
            expect(itemService.getItemByID.mock.calls.length).toBe(1);
            expect(itemService.getItemByID.mock.calls[0][0]).toBe(req.params.itemId);
            expect(itemService.getItemByID.mock.results[0].value).toBe();

            const expected = new ConflictException();
            expect(next).toHaveBeenCalledWith(expected);
        });
        it("should bind the reviews to the response", async () => {
            const reviewController = new ReviewController;
            const reviewService = reviewController.reviewService;
            const itemService = reviewController.itemService;

            const req = interceptor.mockRequest();
            const res = interceptor.mockResponse();
            const next = interceptor.mockNext();


            req.params = {
                itemId: 1
            }

            itemService.getItemByID.mockReturnValueOnce(existingItem)
            reviewService.getAllReviews.mockReturnValueOnce(existingReviews);
            await reviewController.getAllReviewsHandler()(req, res, next);

            expect(reviewService.getAllReviews.mock.calls.length).toBe(1);;
            expect(reviewService.getAllReviews.mock.calls[0][0]).toBe(req.params.itemId);
            expect(reviewService.getAllReviews.mock.results[0].value).toBe(existingReviews);

            expect(res.status.mock.calls.length).toBe(1)
            expect(res.status.mock.calls[0][0]).toBe(200)
            expect(res.json.mock.calls.length).toBe(1)
            expect(res.body.success).toBe(true)
            expect(res.body.data).toBe(existingReviews)
        });
    });
});
