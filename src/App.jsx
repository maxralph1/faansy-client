import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { route } from '@/routes';
import PrivateRoute from '@/utils/PrivateRoute.jsx';

import Features from '@/views/public/Features.jsx';
import Index from '@/views/public/Index.jsx';
import CreateAccount from '@/views/public/CreateAccount.jsx';
import ResetPasswordRequest from '@/views/public/ResetPasswordRequest.jsx';
import ResetPassword from '@/views/public/ResetPassword.jsx';
import PasswordlessSigninRequest from '@/views/public/PasswordlessSigninRequest.jsx';
import PasswordlessSignin from '@/views/public/PasswordlessSignin.jsx';
import PostShow from '@/views/public/posts/Show.jsx';
import UserShow from '@/views/public/users/Show.jsx';

import PrivateUserCreate from '@/views/private/users/Create.jsx';
import PrivateUser from '@/views/private/users/Show.jsx';
import PrivateUserEdit from '@/views/private/users/Edit.jsx';
import PrivateUsersIndex from '@/views/private/users/Index.jsx';

import PrivateUserLikesIndex from '@/views/private/userlikes/Index.jsx';

import PrivateUserVerificationsIndex from '@/views/private/userverifications/Index.jsx';

import PrivateUserBecomecreatorsIndex from '@/views/private/userbecomecreators/Index.jsx';

import PrivateUserBlocksIndex from '@/views/private/blocks/Index.jsx';

import PrivateUserRestrictsIndex from '@/views/private/restricts/Index.jsx';

import PrivateLivestreamsIndex from '@/views/private/livestreams/Index.jsx';

import PrivateStreamsIndex from '@/views/private/streams/Index.jsx';

import PrivateWalletIndex from '@/views/private/wallet/Index.jsx';

import PrivateStatsIndex from '@/views/private/stats/Index.jsx';

import PrivatePostShow from '@/views/private/posts/Show.jsx';
import PrivatePostEdit from '@/views/private/posts/Edit.jsx';
import PrivatePostRepost from '@/views/private/posts/Repost.jsx';
import PrivatePostsIndex from '@/views/private/posts/Index.jsx';

import PrivatePostCommentEdit from '@/views/private/postcomments/Edit.jsx';
import PrivatePostCommentsIndex from '@/views/private/postcomments/Index.jsx';

import PrivateBookmarksIndex from '@/views/private/bookmarks/Index.jsx';

import PrivateSubscriptionsIndex from '@/views/private/subscriptions/Index.jsx';

import PrivateTipEdit from '@/views/private/tips/Edit.jsx';
import PrivateTipsIndex from '@/views/private/tips/Index.jsx';

import PrivateCardEdit from '@/views/private/cards/Edit.jsx';
import PrivateCardsIndex from '@/views/private/cards/Index.jsx';

import PrivateChatShow from '@/views/private/chats/Show.jsx';
import PrivateChatsIndex from '@/views/private/chats/Index.jsx';

import PrivateNotificationsIndex from '@/views/private/notifications/Index.jsx';

import MyProfile from '@/views/private/MyProfile.jsx';
import Home from '@/views/private/Index.jsx';

import NotFound from '@/views/NotFound.jsx';
// import './App.css'


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route element={<Features />} path={ route('features') } />
          <Route element={<CreateAccount />} path={ route('create-account') } />
          <Route element={<ResetPasswordRequest />} path={ route('reset-password-request') } />
          <Route element={<ResetPassword />} path={ route('reset-password') } />
          <Route element={<PasswordlessSigninRequest />} path={ route('passwordless-signin-request') } />
          <Route element={<PasswordlessSignin />} path={ route('passwordless-signin') } />
          <Route element={<PostShow />} path={ route('public.posts.show') } />
          <Route element={<UserShow />} path={ route('public.users.show') } />
          <Route element={<Index />} path={ route('index') } />
          {/* End of Public routes */}

          {/* Protected routes */}
          <Route element={<PrivateRoute />} path='/' >
            <Route element={<PrivateUser />} path={ route('home.users.show') } />
            <Route element={<PrivateUserCreate />} path={ route('home.users.create') } />
            <Route element={<PrivateUserEdit />} path={ route('home.users.edit') } />
            <Route element={<PrivateUsersIndex />} path={ route('home.users.index') } />

            <Route element={<PrivateUserVerificationsIndex />} path={ route('home.user-verifications.index') } />

            <Route element={<PrivateUserBecomecreatorsIndex />} path={ route('home.user-become-creators.index') } />

            <Route element={<PrivateUserLikesIndex />} path={ route('home.user-likes.index') } />

            <Route element={<PrivateUserBlocksIndex />} path={ route('home.blocks.index') } />

            <Route element={<PrivateUserRestrictsIndex />} path={ route('home.restricts.index') } />

            <Route element={<PrivateLivestreamsIndex />} path={ route('home.livestreams.index') } />

            <Route element={<PrivateStreamsIndex />} path={ route('home.streams.index') } />

            <Route element={<PrivateWalletIndex />} path={ route('home.wallet.index') } />

            <Route element={<PrivatePostShow />} path={ route('home.posts.show') } />
            <Route element={<PrivatePostEdit />} path={ route('home.posts.edit') } />
            <Route element={<PrivatePostRepost />} path={ route('home.posts.repost') } />
            <Route element={<PrivatePostsIndex />} path={ route('home.posts.index') } />

            <Route element={<PrivatePostCommentEdit />} path={ route('home.post-comments.edit') } />
            <Route element={<PrivatePostCommentsIndex />} path={ route('home.post-comments.index') } />

            <Route element={<PrivateBookmarksIndex />} path={ route('home.bookmarks.index') } />

            <Route element={<PrivateSubscriptionsIndex />} path={ route('home.subscriptions.index') } />

            <Route element={<PrivateTipEdit />} path={ route('home.tips.edit') } />
            <Route element={<PrivateTipsIndex />} path={ route('home.tips.index') } />

            <Route element={<PrivateCardEdit />} path={ route('home.cards.edit') } />
            <Route element={<PrivateCardsIndex />} path={ route('home.cards.index') } />

            <Route element={<PrivateChatShow />} path={ route('home.chats.show') } />
            <Route element={<PrivateChatsIndex />} path={ route('home.chats.index') } />

            <Route element={<PrivateNotificationsIndex />} path={ route('home.notifications.index') } />

            <Route element={<PrivateStatsIndex />} path={ route('home.stats.index') } />

            <Route element={<MyProfile />} path={ route('home.my-profile') } />

            <Route element={<Home />} path={ route('home.index') } />
          </Route>
          {/* End of Protected routes */}

          {/* Not Found */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
