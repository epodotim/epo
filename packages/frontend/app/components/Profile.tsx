import {
  GithubLogo,
  GlobeSimple,
  MapPin,
  TelegramLogo,
  XLogo,
} from "@phosphor-icons/react";
import FarcasterLogo from "~/components/icons/Farcaster";
import Popover from "~/components/ui/Popover";
import Avatar from "~/components/Avatar";

export default function Profile({ data }: any) {
  return (
    <div className="flex w-full flex-col space-y-4 px-6 py-8">
      <Avatar fullname={data?.uid ?? ""} className="h-20 w-20" />
      {data?.uid && <h1 className="text-xl">{data?.uid}</h1>}
      {data?.records?.description && (
        <p className="mb-6 text-sm">{data?.records?.description}</p>
      )}
      {data?.records?.location && (
        <p className="flex items-center text-sm">
          <MapPin size={20} /> {data?.records?.location}
        </p>
      )}
      {data?.records && <SocialLinks records={data?.records} />}
      {/* {data?.records?.keywords && <Keywords keywords={data.records.keywords} />} */}
    </div>
  );
}

const SocialLinks = ({ records }: any) => (
  <ul className="links">
    {records["com.twitter"] && (
      <li>
        <Popover
          trigger={
            <a
              href={`https://x.com/${records["com.twitter"]}`}
              target="_blank"
              rel="noreferrer"
              className="icon"
            >
              <XLogo size={20} />
            </a>
          }
        >
          <a
            href={`https://x.com/${records["com.twitter"]}`}
            target="_blank"
            rel="noreferrer"
            className="pop"
          >
            <XLogo size={20} />
            <span>
              {records["com.twitter"]}
              <span className="ml-1.5 text-xs opacity-80">on X (Twitter)</span>
            </span>
          </a>
        </Popover>
      </li>
    )}
    {records["com.github"] && (
      <li>
        <Popover
          trigger={
            <a
              href={`https://github.com/${records["com.github"]}`}
              target="_blank"
              rel="noreferrer"
              className="icon"
            >
              <GithubLogo size={20} />
            </a>
          }
        >
          <a
            href={`https://github.com/${records["com.github"]}`}
            target="_blank"
            rel="noreferrer"
            className="pop"
          >
            <GithubLogo size={20} />
            <span>
              {records["com.github"]}
              <span className="ml-1.5 text-xs opacity-80">on Github</span>
            </span>
          </a>
        </Popover>
      </li>
    )}
    {records["xyz.farcaster"] && (
      <li>
        <Popover
          trigger={
            <a
              href={`https://warpcast.com/${records["xyz.farcaster"]}`}
              target="_blank"
              rel="noreferrer"
              className="icon"
            >
              <FarcasterLogo className="h-4 w-4" />
            </a>
          }
        >
          <a
            href={`https://warpcast.com/${records["xyz.farcaster"]}`}
            target="_blank"
            rel="noreferrer"
            className="pop"
          >
            <FarcasterLogo className="h-4 w-4" />
            <span>
              {records["xyz.farcaster"]}
              <span className="ml-1.5 text-xs opacity-80">on Farcaster</span>
            </span>
          </a>
        </Popover>
      </li>
    )}
    {records["org.telegram"] && (
      <li>
        <Popover
          trigger={
            <a
              href={`https://github.com/${records["com.github"]}`}
              target="_blank"
              rel="noreferrer"
              className="icon"
            >
              <TelegramLogo size={20} />
            </a>
          }
        >
          <a
            href={`https://t.me/${records["org.telegram"]}`}
            target="_blank"
            rel="noreferrer"
            className="pop"
          >
            <TelegramLogo size={20} />
            <span>
              {records["org.telegram"]}
              <span className="ml-1.5 text-xs opacity-80">on Telegram</span>
            </span>
          </a>
        </Popover>
      </li>
    )}
    {records?.url && (
      <li>
        <a href={records?.url} target="_blank" rel="noreferrer" className="url">
          <GlobeSimple size={20} />
          {records?.url.replace(/^https?:\/\//, "")}
        </a>
      </li>
    )}
    {records?.url2 && (
      <li>
        <a
          href={records?.url2}
          target="_blank"
          rel="noreferrer"
          className="url"
        >
          <GlobeSimple size={20} />
          {records?.url2.replace(/^https?:\/\//, "")}
        </a>
      </li>
    )}
    {records?.url3 && (
      <li>
        <a
          href={records?.url3}
          target="_blank"
          rel="noreferrer"
          className="url"
        >
          <GlobeSimple size={20} />
          {records?.url3.replace(/^https?:\/\//, "")}
        </a>
      </li>
    )}
  </ul>
);

const Keywords = ({ keywords }: any) => (
  <ul className="pt-6">
    {keywords.split(",").map((keyword: string) => (
      <li
        key={keyword.toLowerCase()}
        className="my-1 mr-2 inline-flex items-center justify-center rounded-xl border-2 border-c2 px-3 py-1 text-sm"
      >
        {keyword}
      </li>
    ))}
  </ul>
);
