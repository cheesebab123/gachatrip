import { apiClient, type ApiResponse } from './apiClient';

export interface DrawRequest {
  style?: string;                  // 힐링, 미식, 액티비티, 자연 등
  date?: string;                   // 당일치기, 1박2일, 2박3일 등
  budget?: string;                 // 10만원 이하, 20만원대 등
  distance?: number;               // 이동 거리/소요시간
  preferredRegions?: string[];     // 선호 지역 리스트
  companion?: string;              // 혼자, 연인과, 친구와, 가족과
  memberCount?: number;            // 인원 수
  excludeConditions?: string[];    // 제외 조건
}

export interface TicketResponse {
  id: number;
  name: string;
  regionName: string;
  summary: string;
  description: string;
  hashtags: string[];
  imageUrl: string;
  capsuleImageUrl: string;
  travelTime: string;
  weather: string;
  estimatedBudget: number;
  confirmed: boolean;
  isGroup: boolean;
  groupRoomCode?: string;
}

export interface GroupRoomResponse {
  roomCode: string;
  hostNickname: string;
  members: Array<{
    userId: number;
    nickname: string;
    profileImageUrl?: string;
    isReady: boolean;
  }>;
  status: 'WAITING' | 'READY' | 'DRAWN';
  resultTicket?: TicketResponse;
}

export const gachaApi = {
  // 개인 솔로 가챠 뽑기
  drawSolo: async (conditions?: DrawRequest): Promise<TicketResponse> => {
    const response = await apiClient.post<ApiResponse<TicketResponse>>('/gacha/draw', conditions || {});
    return response.data.data;
  },

  // 가본 곳 제외 후 재뽑기
  redraw: async (ticketId: number): Promise<TicketResponse> => {
    const response = await apiClient.post<ApiResponse<TicketResponse>>('/gacha/redraw', null, {
      params: { ticketId },
    });
    return response.data.data;
  },

  // 여행지 티켓 최종 확정
  confirmTicket: async (ticketId: number): Promise<TicketResponse> => {
    const response = await apiClient.post<ApiResponse<TicketResponse>>(`/gacha/confirm/${ticketId}`);
    return response.data.data;
  },

  // 그룹 가챠방 생성
  createGroup: async (data: { roomName?: string; maxMembers?: number }): Promise<GroupRoomResponse> => {
    const response = await apiClient.post<ApiResponse<GroupRoomResponse>>('/gacha/groups', data);
    return response.data.data;
  },

  // 초대 코드로 그룹 참여
  joinGroup: async (roomCode: string): Promise<GroupRoomResponse> => {
    const response = await apiClient.post<ApiResponse<GroupRoomResponse>>('/gacha/groups/join', { roomCode });
    return response.data.data;
  },

  // 그룹방 상태 조회
  getGroupRoom: async (roomCode: string): Promise<GroupRoomResponse> => {
    const response = await apiClient.get<ApiResponse<GroupRoomResponse>>(`/gacha/groups/${roomCode}`);
    return response.data.data;
  },
};
