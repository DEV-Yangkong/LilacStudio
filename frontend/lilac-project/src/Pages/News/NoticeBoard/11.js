//수정된코드

useEffect(() => {
  if (!selectedPost) {
    const fetchPostDetail = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/notice_board/notice/${postId}/`
        );
        setSelectedPost(response.data);
        // 상세 페이지 로드 시 조회수 증가 요청 보냄
        try {
          const increaseResponse = await axios.post(
            `http://127.0.0.1:8000/api/v1/notice_board/notice/${postId}/increase-views/`
          );
          if (increaseResponse.status === 200) {
            // 조회수 증가 요청 성공 시 상태 업데이트
            setSelectedPost((prevState) => ({
              ...prevState,
              views_count: prevState.views_count + 1,
            }));
          }
        } catch (error) {
          console.error("Error increasing views:", error);
        }
      } catch (error) {
        console.error("Error fetching post detail:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPostDetail();
  }
}, [postId, selectedPost]);

//위 코드로 하면 에러뜸
// ERROR
// Cannot read properties of null (reading 'video_url')
// TypeError: Cannot read properties of null (reading 'video_url')
//     at NoticeBoardDetail (http://localhost:3000/static/js/bundle.js:2646:162)
//     at renderWithHooks (http://localhost:3000/static/js/bundle.js:31579:22)
//     at mountIndeterminateComponent (http://localhost:3000/static/js/bundle.js:34865:17)
//     at beginWork (http://localhost:3000/static/js/bundle.js:36161:20)
//     at HTMLUnknownElement.callCallback (http://localhost:3000/static/js/bundle.js:21171:18)
//     at Object.invokeGuardedCallbackDev (http://localhost:3000/static/js/bundle.js:21215:20)
//     at invokeGuardedCallback (http://localhost:3000/static/js/bundle.js:21272:35)
//     at beginWork$1 (http://localhost:3000/static/js/bundle.js:41146:11)
//     at performUnitOfWork (http://localhost:3000/static/js/bundle.js:40393:16)
//     at workLoopSync (http://localhost:3000/static/js/bundle.js:40316:9)

// 기존 코드
useEffect(() => {
  if (!selectedPost) {
    const fetchPostDetail = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/notice_board/notice/${postId}/`
        );
        setSelectedPost(response.data);
      } catch (error) {
        console.error("Error fetching post detail:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPostDetail();
  }
}, [postId, selectedPost]);
