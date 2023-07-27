import { CommunityMemberController } from 'app/controllers/community_member.controller'
import { CommunityMemberDto } from 'app/dto/community_member.dto'
import { ErrorMiddleware } from 'app/middlewares/error.middleware'
import { Router } from 'express'

const router = Router()

router.get(
  '/:id/members/list',
  CommunityMemberDto.GetCommunityMemberList,
  ErrorMiddleware.DtoValidator,
  CommunityMemberController.GetCommunityMemberList,
)

router.post(
  '/:id/members/request',
  CommunityMemberDto.RequestCommunityMember,
  ErrorMiddleware.DtoValidator,
  CommunityMemberController.RequestCommunityMember,
)

router.post(
  '/:id/members/approve',
  CommunityMemberDto.ApproveCommunityMember,
  ErrorMiddleware.DtoValidator,
  CommunityMemberController.ApproveCommunityMember,
)

router.delete(
  '/:id/members/delete',
  CommunityMemberDto.DeleteCommunityMember,
  ErrorMiddleware.DtoValidator,
  CommunityMemberController.DeleteCommunityMember,
)

export const CommunityMemberRouter = router
