import { useAuth } from "../../contexts/AuthContext";
import getStoredAuthKey from "../../utils/getStoredAuthKey";
import { useDeletePost } from "./useDeletePost";
import { HiTrash } from "react-icons/hi2";

function BlogItem({ post, accessRoles = ["admin", "trainer"] }) {
  const authenticationKey = getStoredAuthKey();
  const { id: postId, postAt, postTitle, postContent, userName } = post;
  const { isDeleting, deletePost } = useDeletePost();
  const { user } = useAuth();
  const userIsAuthorized = user && accessRoles.includes(user.role);
  // console.log(userIsAuthorized);

  return (
    <li className="flex flex-col px-2 py-4 md:px-4">
      <div className="flex items-center gap-6">
        <h1 className="mb-1 font-semibold sm:mb-2">{postTitle}</h1>
        {userIsAuthorized ? (
          <button
            className="mb-1 sm:mb-2"
            onClick={() => deletePost({ postId, authenticationKey })}
            disabled={isDeleting}
          >
            <HiTrash className="text-red-800" />
          </button>
        ) : (
          ""
        )}
      </div>
      <p className="mb-4 text-xs text-zinc-500">{postAt}</p>

      <p className="mb-4 text-sm">{postContent}</p>
      <p className="text-xs text-zinc-500">By: {userName}</p>
    </li>
  );
}

export default BlogItem;
