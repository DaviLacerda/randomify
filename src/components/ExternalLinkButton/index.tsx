import { RiExternalLinkFill } from "react-icons/ri";
import { LinkButtonWithIcon } from "../LinkButtonWithIcon";

interface ExternalLinkButtonProps {
    href: string;
    text: string;
}

export function ExternalLinkButton({ href, text }: ExternalLinkButtonProps) {
    return (
        <LinkButtonWithIcon href={href} text={text} icon={<RiExternalLinkFill className="fill-black w-8 h-10" />}  target="_blank" />
    );
}
