import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { useEffect } from "react";
import { Route, Switch, useLocation, useParams } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import FileManager from "./pages/FileManager";
import AdminPosts from "./pages/AdminPosts";
import AdminPostEditor from "./pages/AdminPostEditor";
import AdminImport from "./pages/AdminImport";
import AdminSubscribers from "./pages/AdminSubscribers";
import WritingIndex from "./pages/WritingIndex";
import WritingPost from "./pages/WritingPost";
import SubscribeConfirm from "./pages/SubscribeConfirm";
import Subscribe from "./pages/Subscribe";

// Legacy /writing → /blog redirect (preserves SEO equity)
function WritingRedirect() {
  const [, setLocation] = useLocation();
  useEffect(() => { setLocation("/blog", { replace: true }); }, []);
  return null;
}
function WritingPostRedirect() {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  useEffect(() => { setLocation(`/blog/${slug ?? ""}`, { replace: true }); }, [slug]);
  return null;
}

// Wrapper to extract :slug param for WritingPost
function WritingPostRoute() {
  const { slug } = useParams<{ slug: string }>();
  return <WritingPost slug={slug ?? ""} />;
}

// Wrapper to extract :id param for AdminPostEditor (edit mode)
function AdminPostEditorRoute() {
  const { id } = useParams<{ id: string }>();
  const postId = id ? parseInt(id, 10) : undefined;
  return <AdminPostEditor postId={postId} />;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      {/* File manager */}
      <Route path={"/files"} component={FileManager} />
      {/* Public blog - canonical routes */}
      <Route path={"/blog"} component={WritingIndex} />
      <Route path={"/blog/:slug"} component={WritingPostRoute} />
      {/* Legacy /writing redirects → /blog (301-equivalent client-side) */}
      <Route path={"/writing"} component={WritingRedirect} />
      <Route path={"/writing/:slug"} component={WritingPostRedirect} />
      {/* Admin CMS */}
      <Route path={"/admin/posts"} component={AdminPosts} />
      <Route path={"/admin/posts/new"} component={() => <AdminPostEditor />} />
      <Route path={"/admin/import"} component={AdminImport} />
      <Route path={"/admin/subscribers"} component={AdminSubscribers} />
      <Route path={"/admin/posts/:id"} component={AdminPostEditorRoute} />
      {/* Subscription pages */}
      <Route path={"/subscribe"} component={Subscribe} />
      <Route path={"/subscribe/confirm"} component={SubscribeConfirm} />
      {/* Fallbacks */}
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
