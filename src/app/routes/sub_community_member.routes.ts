import { SubCommunityMemberController } from 'app/controllers/sub_community_member.controller'
import { SubCommunityMemberDto } from 'app/dto/sub_community_member.dto'
import { ErrorMiddleware } from 'app/middlewares/error.middleware'
import { Router } from 'express'

const router = Router()

router.get(
  '/:id/members/list',
  SubCommunityMemberDto.GetSubCommunityMemberList,
  ErrorMiddleware.DtoValidator,
  SubCommunityMemberController.GetSubCommunityMemberList,
)

router.post(
  '/:id/members/request',
  SubCommunityMemberDto.RequestSubCommunityMember,
  ErrorMiddleware.DtoValidator,
  SubCommunityMemberController.RequestSubCommunityMember,
)

router.post(
  '/:id/members/approve',
  SubCommunityMemberDto.ApproveSubCommunityMember,
  ErrorMiddleware.DtoValidator,
  SubCommunityMemberController.ApproveSubCommunityMember,
)

router.delete(
  '/:id/members/delete',
  SubCommunityMemberDto.DeleteSubCommunityMember,
  ErrorMiddleware.DtoValidator,
  SubCommunityMemberController.DeleteSubCommunityMember,
)

export const SubCommunityMemberRouter = router
