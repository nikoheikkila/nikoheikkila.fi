export type Maybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type AvifOptions = {
  readonly quality: Maybe<Scalars["Int"]>;
  readonly lossless: Maybe<Scalars["Boolean"]>;
  readonly speed: Maybe<Scalars["Int"]>;
};

export type BlurredOptions = {
  /** Width of the generated low-res preview. Default is 20px */
  readonly width: Maybe<Scalars["Int"]>;
  /** Force the output format for the low-res preview. Default is to use the same format as the input. You should rarely need to change this */
  readonly toFormat: Maybe<ImageFormat>;
};

export type BooleanQueryOperatorInput = {
  readonly eq: Maybe<Scalars["Boolean"]>;
  readonly ne: Maybe<Scalars["Boolean"]>;
  readonly in: Maybe<ReadonlyArray<Maybe<Scalars["Boolean"]>>>;
  readonly nin: Maybe<ReadonlyArray<Maybe<Scalars["Boolean"]>>>;
};

export type DateQueryOperatorInput = {
  readonly eq: Maybe<Scalars["Date"]>;
  readonly ne: Maybe<Scalars["Date"]>;
  readonly gt: Maybe<Scalars["Date"]>;
  readonly gte: Maybe<Scalars["Date"]>;
  readonly lt: Maybe<Scalars["Date"]>;
  readonly lte: Maybe<Scalars["Date"]>;
  readonly in: Maybe<ReadonlyArray<Maybe<Scalars["Date"]>>>;
  readonly nin: Maybe<ReadonlyArray<Maybe<Scalars["Date"]>>>;
};

export type Directory = Node & {
  readonly __typename?: "Directory";
  readonly sourceInstanceName: Scalars["String"];
  readonly absolutePath: Scalars["String"];
  readonly relativePath: Scalars["String"];
  readonly extension: Scalars["String"];
  readonly size: Scalars["Int"];
  readonly prettySize: Scalars["String"];
  readonly modifiedTime: Scalars["Date"];
  readonly accessTime: Scalars["Date"];
  readonly changeTime: Scalars["Date"];
  readonly birthTime: Scalars["Date"];
  readonly root: Scalars["String"];
  readonly dir: Scalars["String"];
  readonly base: Scalars["String"];
  readonly ext: Scalars["String"];
  readonly name: Scalars["String"];
  readonly relativeDirectory: Scalars["String"];
  readonly dev: Scalars["Int"];
  readonly mode: Scalars["Int"];
  readonly nlink: Scalars["Int"];
  readonly uid: Scalars["Int"];
  readonly gid: Scalars["Int"];
  readonly rdev: Scalars["Int"];
  readonly ino: Scalars["Float"];
  readonly atimeMs: Scalars["Float"];
  readonly mtimeMs: Scalars["Float"];
  readonly ctimeMs: Scalars["Float"];
  readonly atime: Scalars["Date"];
  readonly mtime: Scalars["Date"];
  readonly ctime: Scalars["Date"];
  /** @deprecated Use `birthTime` instead */
  readonly birthtime: Maybe<Scalars["Date"]>;
  /** @deprecated Use `birthTime` instead */
  readonly birthtimeMs: Maybe<Scalars["Float"]>;
  readonly blksize: Maybe<Scalars["Int"]>;
  readonly blocks: Maybe<Scalars["Int"]>;
  readonly id: Scalars["ID"];
  readonly parent: Maybe<Node>;
  readonly children: ReadonlyArray<Node>;
  readonly internal: Internal;
};

export type DirectoryModifiedTimeArgs = {
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  difference: Maybe<Scalars["String"]>;
  locale: Maybe<Scalars["String"]>;
};

export type DirectoryAccessTimeArgs = {
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  difference: Maybe<Scalars["String"]>;
  locale: Maybe<Scalars["String"]>;
};

export type DirectoryChangeTimeArgs = {
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  difference: Maybe<Scalars["String"]>;
  locale: Maybe<Scalars["String"]>;
};

export type DirectoryBirthTimeArgs = {
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  difference: Maybe<Scalars["String"]>;
  locale: Maybe<Scalars["String"]>;
};

export type DirectoryAtimeArgs = {
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  difference: Maybe<Scalars["String"]>;
  locale: Maybe<Scalars["String"]>;
};

export type DirectoryMtimeArgs = {
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  difference: Maybe<Scalars["String"]>;
  locale: Maybe<Scalars["String"]>;
};

export type DirectoryCtimeArgs = {
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  difference: Maybe<Scalars["String"]>;
  locale: Maybe<Scalars["String"]>;
};

export type DirectoryConnection = {
  readonly __typename?: "DirectoryConnection";
  readonly totalCount: Scalars["Int"];
  readonly edges: ReadonlyArray<DirectoryEdge>;
  readonly nodes: ReadonlyArray<Directory>;
  readonly pageInfo: PageInfo;
  readonly distinct: ReadonlyArray<Scalars["String"]>;
  readonly group: ReadonlyArray<DirectoryGroupConnection>;
};

export type DirectoryConnectionDistinctArgs = {
  field: DirectoryFieldsEnum;
};

export type DirectoryConnectionGroupArgs = {
  skip: Maybe<Scalars["Int"]>;
  limit: Maybe<Scalars["Int"]>;
  field: DirectoryFieldsEnum;
};

export type DirectoryEdge = {
  readonly __typename?: "DirectoryEdge";
  readonly next: Maybe<Directory>;
  readonly node: Directory;
  readonly previous: Maybe<Directory>;
};

export enum DirectoryFieldsEnum {
  SourceInstanceName = "sourceInstanceName",
  AbsolutePath = "absolutePath",
  RelativePath = "relativePath",
  Extension = "extension",
  Size = "size",
  PrettySize = "prettySize",
  ModifiedTime = "modifiedTime",
  AccessTime = "accessTime",
  ChangeTime = "changeTime",
  BirthTime = "birthTime",
  Root = "root",
  Dir = "dir",
  Base = "base",
  Ext = "ext",
  Name = "name",
  RelativeDirectory = "relativeDirectory",
  Dev = "dev",
  Mode = "mode",
  Nlink = "nlink",
  Uid = "uid",
  Gid = "gid",
  Rdev = "rdev",
  Ino = "ino",
  AtimeMs = "atimeMs",
  MtimeMs = "mtimeMs",
  CtimeMs = "ctimeMs",
  Atime = "atime",
  Mtime = "mtime",
  Ctime = "ctime",
  Birthtime = "birthtime",
  BirthtimeMs = "birthtimeMs",
  Blksize = "blksize",
  Blocks = "blocks",
  Id = "id",
  ParentId = "parent___id",
  ParentParentId = "parent___parent___id",
  ParentParentParentId = "parent___parent___parent___id",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentChildren = "parent___children",
  ParentChildrenId = "parent___children___id",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  Children = "children",
  ChildrenId = "children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentParentId = "children___parent___parent___id",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenChildren = "children___children",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
}

export type DirectoryFilterInput = {
  readonly sourceInstanceName: Maybe<StringQueryOperatorInput>;
  readonly absolutePath: Maybe<StringQueryOperatorInput>;
  readonly relativePath: Maybe<StringQueryOperatorInput>;
  readonly extension: Maybe<StringQueryOperatorInput>;
  readonly size: Maybe<IntQueryOperatorInput>;
  readonly prettySize: Maybe<StringQueryOperatorInput>;
  readonly modifiedTime: Maybe<DateQueryOperatorInput>;
  readonly accessTime: Maybe<DateQueryOperatorInput>;
  readonly changeTime: Maybe<DateQueryOperatorInput>;
  readonly birthTime: Maybe<DateQueryOperatorInput>;
  readonly root: Maybe<StringQueryOperatorInput>;
  readonly dir: Maybe<StringQueryOperatorInput>;
  readonly base: Maybe<StringQueryOperatorInput>;
  readonly ext: Maybe<StringQueryOperatorInput>;
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly relativeDirectory: Maybe<StringQueryOperatorInput>;
  readonly dev: Maybe<IntQueryOperatorInput>;
  readonly mode: Maybe<IntQueryOperatorInput>;
  readonly nlink: Maybe<IntQueryOperatorInput>;
  readonly uid: Maybe<IntQueryOperatorInput>;
  readonly gid: Maybe<IntQueryOperatorInput>;
  readonly rdev: Maybe<IntQueryOperatorInput>;
  readonly ino: Maybe<FloatQueryOperatorInput>;
  readonly atimeMs: Maybe<FloatQueryOperatorInput>;
  readonly mtimeMs: Maybe<FloatQueryOperatorInput>;
  readonly ctimeMs: Maybe<FloatQueryOperatorInput>;
  readonly atime: Maybe<DateQueryOperatorInput>;
  readonly mtime: Maybe<DateQueryOperatorInput>;
  readonly ctime: Maybe<DateQueryOperatorInput>;
  readonly birthtime: Maybe<DateQueryOperatorInput>;
  readonly birthtimeMs: Maybe<FloatQueryOperatorInput>;
  readonly blksize: Maybe<IntQueryOperatorInput>;
  readonly blocks: Maybe<IntQueryOperatorInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly internal: Maybe<InternalFilterInput>;
};

export type DirectoryGroupConnection = {
  readonly __typename?: "DirectoryGroupConnection";
  readonly totalCount: Scalars["Int"];
  readonly edges: ReadonlyArray<DirectoryEdge>;
  readonly nodes: ReadonlyArray<Directory>;
  readonly pageInfo: PageInfo;
  readonly field: Scalars["String"];
  readonly fieldValue: Maybe<Scalars["String"]>;
};

export type DirectorySortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<DirectoryFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};

export type DuotoneGradient = {
  readonly highlight: Scalars["String"];
  readonly shadow: Scalars["String"];
  readonly opacity: Maybe<Scalars["Int"]>;
};

export type File = Node & {
  readonly __typename?: "File";
  readonly sourceInstanceName: Scalars["String"];
  readonly absolutePath: Scalars["String"];
  readonly relativePath: Scalars["String"];
  readonly extension: Scalars["String"];
  readonly size: Scalars["Int"];
  readonly prettySize: Scalars["String"];
  readonly modifiedTime: Scalars["Date"];
  readonly accessTime: Scalars["Date"];
  readonly changeTime: Scalars["Date"];
  readonly birthTime: Scalars["Date"];
  readonly root: Scalars["String"];
  readonly dir: Scalars["String"];
  readonly base: Scalars["String"];
  readonly ext: Scalars["String"];
  readonly name: Scalars["String"];
  readonly relativeDirectory: Scalars["String"];
  readonly dev: Scalars["Int"];
  readonly mode: Scalars["Int"];
  readonly nlink: Scalars["Int"];
  readonly uid: Scalars["Int"];
  readonly gid: Scalars["Int"];
  readonly rdev: Scalars["Int"];
  readonly ino: Scalars["Float"];
  readonly atimeMs: Scalars["Float"];
  readonly mtimeMs: Scalars["Float"];
  readonly ctimeMs: Scalars["Float"];
  readonly atime: Scalars["Date"];
  readonly mtime: Scalars["Date"];
  readonly ctime: Scalars["Date"];
  /** @deprecated Use `birthTime` instead */
  readonly birthtime: Maybe<Scalars["Date"]>;
  /** @deprecated Use `birthTime` instead */
  readonly birthtimeMs: Maybe<Scalars["Float"]>;
  readonly blksize: Maybe<Scalars["Int"]>;
  readonly blocks: Maybe<Scalars["Int"]>;
  readonly url: Maybe<Scalars["String"]>;
  /** Copy file to static directory and return public url to it */
  readonly publicURL: Maybe<Scalars["String"]>;
  /** Returns all children nodes filtered by type ImageSharp */
  readonly childrenImageSharp: Maybe<ReadonlyArray<Maybe<ImageSharp>>>;
  /** Returns the first child node of type ImageSharp or null if there are no children of given type on this node */
  readonly childImageSharp: Maybe<ImageSharp>;
  /** Returns all children nodes filtered by type MarkdownRemark */
  readonly childrenMarkdownRemark: Maybe<ReadonlyArray<Maybe<MarkdownRemark>>>;
  /** Returns the first child node of type MarkdownRemark or null if there are no children of given type on this node */
  readonly childMarkdownRemark: Maybe<MarkdownRemark>;
  readonly id: Scalars["ID"];
  readonly parent: Maybe<Node>;
  readonly children: ReadonlyArray<Node>;
  readonly internal: Internal;
};

export type FileModifiedTimeArgs = {
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  difference: Maybe<Scalars["String"]>;
  locale: Maybe<Scalars["String"]>;
};

export type FileAccessTimeArgs = {
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  difference: Maybe<Scalars["String"]>;
  locale: Maybe<Scalars["String"]>;
};

export type FileChangeTimeArgs = {
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  difference: Maybe<Scalars["String"]>;
  locale: Maybe<Scalars["String"]>;
};

export type FileBirthTimeArgs = {
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  difference: Maybe<Scalars["String"]>;
  locale: Maybe<Scalars["String"]>;
};

export type FileAtimeArgs = {
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  difference: Maybe<Scalars["String"]>;
  locale: Maybe<Scalars["String"]>;
};

export type FileMtimeArgs = {
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  difference: Maybe<Scalars["String"]>;
  locale: Maybe<Scalars["String"]>;
};

export type FileCtimeArgs = {
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  difference: Maybe<Scalars["String"]>;
  locale: Maybe<Scalars["String"]>;
};

export type FileConnection = {
  readonly __typename?: "FileConnection";
  readonly totalCount: Scalars["Int"];
  readonly edges: ReadonlyArray<FileEdge>;
  readonly nodes: ReadonlyArray<File>;
  readonly pageInfo: PageInfo;
  readonly distinct: ReadonlyArray<Scalars["String"]>;
  readonly group: ReadonlyArray<FileGroupConnection>;
};

export type FileConnectionDistinctArgs = {
  field: FileFieldsEnum;
};

export type FileConnectionGroupArgs = {
  skip: Maybe<Scalars["Int"]>;
  limit: Maybe<Scalars["Int"]>;
  field: FileFieldsEnum;
};

export type FileEdge = {
  readonly __typename?: "FileEdge";
  readonly next: Maybe<File>;
  readonly node: File;
  readonly previous: Maybe<File>;
};

export enum FileFieldsEnum {
  SourceInstanceName = "sourceInstanceName",
  AbsolutePath = "absolutePath",
  RelativePath = "relativePath",
  Extension = "extension",
  Size = "size",
  PrettySize = "prettySize",
  ModifiedTime = "modifiedTime",
  AccessTime = "accessTime",
  ChangeTime = "changeTime",
  BirthTime = "birthTime",
  Root = "root",
  Dir = "dir",
  Base = "base",
  Ext = "ext",
  Name = "name",
  RelativeDirectory = "relativeDirectory",
  Dev = "dev",
  Mode = "mode",
  Nlink = "nlink",
  Uid = "uid",
  Gid = "gid",
  Rdev = "rdev",
  Ino = "ino",
  AtimeMs = "atimeMs",
  MtimeMs = "mtimeMs",
  CtimeMs = "ctimeMs",
  Atime = "atime",
  Mtime = "mtime",
  Ctime = "ctime",
  Birthtime = "birthtime",
  BirthtimeMs = "birthtimeMs",
  Blksize = "blksize",
  Blocks = "blocks",
  Url = "url",
  PublicUrl = "publicURL",
  ChildrenImageSharp = "childrenImageSharp",
  ChildrenImageSharpFixedBase64 = "childrenImageSharp___fixed___base64",
  ChildrenImageSharpFixedTracedSvg = "childrenImageSharp___fixed___tracedSVG",
  ChildrenImageSharpFixedAspectRatio = "childrenImageSharp___fixed___aspectRatio",
  ChildrenImageSharpFixedWidth = "childrenImageSharp___fixed___width",
  ChildrenImageSharpFixedHeight = "childrenImageSharp___fixed___height",
  ChildrenImageSharpFixedSrc = "childrenImageSharp___fixed___src",
  ChildrenImageSharpFixedSrcSet = "childrenImageSharp___fixed___srcSet",
  ChildrenImageSharpFixedSrcWebp = "childrenImageSharp___fixed___srcWebp",
  ChildrenImageSharpFixedSrcSetWebp = "childrenImageSharp___fixed___srcSetWebp",
  ChildrenImageSharpFixedOriginalName = "childrenImageSharp___fixed___originalName",
  ChildrenImageSharpFluidBase64 = "childrenImageSharp___fluid___base64",
  ChildrenImageSharpFluidTracedSvg = "childrenImageSharp___fluid___tracedSVG",
  ChildrenImageSharpFluidAspectRatio = "childrenImageSharp___fluid___aspectRatio",
  ChildrenImageSharpFluidSrc = "childrenImageSharp___fluid___src",
  ChildrenImageSharpFluidSrcSet = "childrenImageSharp___fluid___srcSet",
  ChildrenImageSharpFluidSrcWebp = "childrenImageSharp___fluid___srcWebp",
  ChildrenImageSharpFluidSrcSetWebp = "childrenImageSharp___fluid___srcSetWebp",
  ChildrenImageSharpFluidSizes = "childrenImageSharp___fluid___sizes",
  ChildrenImageSharpFluidOriginalImg = "childrenImageSharp___fluid___originalImg",
  ChildrenImageSharpFluidOriginalName = "childrenImageSharp___fluid___originalName",
  ChildrenImageSharpFluidPresentationWidth = "childrenImageSharp___fluid___presentationWidth",
  ChildrenImageSharpFluidPresentationHeight = "childrenImageSharp___fluid___presentationHeight",
  ChildrenImageSharpGatsbyImageData = "childrenImageSharp___gatsbyImageData",
  ChildrenImageSharpOriginalWidth = "childrenImageSharp___original___width",
  ChildrenImageSharpOriginalHeight = "childrenImageSharp___original___height",
  ChildrenImageSharpOriginalSrc = "childrenImageSharp___original___src",
  ChildrenImageSharpResizeSrc = "childrenImageSharp___resize___src",
  ChildrenImageSharpResizeTracedSvg = "childrenImageSharp___resize___tracedSVG",
  ChildrenImageSharpResizeWidth = "childrenImageSharp___resize___width",
  ChildrenImageSharpResizeHeight = "childrenImageSharp___resize___height",
  ChildrenImageSharpResizeAspectRatio = "childrenImageSharp___resize___aspectRatio",
  ChildrenImageSharpResizeOriginalName = "childrenImageSharp___resize___originalName",
  ChildrenImageSharpId = "childrenImageSharp___id",
  ChildrenImageSharpParentId = "childrenImageSharp___parent___id",
  ChildrenImageSharpParentParentId = "childrenImageSharp___parent___parent___id",
  ChildrenImageSharpParentParentChildren = "childrenImageSharp___parent___parent___children",
  ChildrenImageSharpParentChildren = "childrenImageSharp___parent___children",
  ChildrenImageSharpParentChildrenId = "childrenImageSharp___parent___children___id",
  ChildrenImageSharpParentChildrenChildren = "childrenImageSharp___parent___children___children",
  ChildrenImageSharpParentInternalContent = "childrenImageSharp___parent___internal___content",
  ChildrenImageSharpParentInternalContentDigest = "childrenImageSharp___parent___internal___contentDigest",
  ChildrenImageSharpParentInternalDescription = "childrenImageSharp___parent___internal___description",
  ChildrenImageSharpParentInternalFieldOwners = "childrenImageSharp___parent___internal___fieldOwners",
  ChildrenImageSharpParentInternalIgnoreType = "childrenImageSharp___parent___internal___ignoreType",
  ChildrenImageSharpParentInternalMediaType = "childrenImageSharp___parent___internal___mediaType",
  ChildrenImageSharpParentInternalOwner = "childrenImageSharp___parent___internal___owner",
  ChildrenImageSharpParentInternalType = "childrenImageSharp___parent___internal___type",
  ChildrenImageSharpChildren = "childrenImageSharp___children",
  ChildrenImageSharpChildrenId = "childrenImageSharp___children___id",
  ChildrenImageSharpChildrenParentId = "childrenImageSharp___children___parent___id",
  ChildrenImageSharpChildrenParentChildren = "childrenImageSharp___children___parent___children",
  ChildrenImageSharpChildrenChildren = "childrenImageSharp___children___children",
  ChildrenImageSharpChildrenChildrenId = "childrenImageSharp___children___children___id",
  ChildrenImageSharpChildrenChildrenChildren = "childrenImageSharp___children___children___children",
  ChildrenImageSharpChildrenInternalContent = "childrenImageSharp___children___internal___content",
  ChildrenImageSharpChildrenInternalContentDigest = "childrenImageSharp___children___internal___contentDigest",
  ChildrenImageSharpChildrenInternalDescription = "childrenImageSharp___children___internal___description",
  ChildrenImageSharpChildrenInternalFieldOwners = "childrenImageSharp___children___internal___fieldOwners",
  ChildrenImageSharpChildrenInternalIgnoreType = "childrenImageSharp___children___internal___ignoreType",
  ChildrenImageSharpChildrenInternalMediaType = "childrenImageSharp___children___internal___mediaType",
  ChildrenImageSharpChildrenInternalOwner = "childrenImageSharp___children___internal___owner",
  ChildrenImageSharpChildrenInternalType = "childrenImageSharp___children___internal___type",
  ChildrenImageSharpInternalContent = "childrenImageSharp___internal___content",
  ChildrenImageSharpInternalContentDigest = "childrenImageSharp___internal___contentDigest",
  ChildrenImageSharpInternalDescription = "childrenImageSharp___internal___description",
  ChildrenImageSharpInternalFieldOwners = "childrenImageSharp___internal___fieldOwners",
  ChildrenImageSharpInternalIgnoreType = "childrenImageSharp___internal___ignoreType",
  ChildrenImageSharpInternalMediaType = "childrenImageSharp___internal___mediaType",
  ChildrenImageSharpInternalOwner = "childrenImageSharp___internal___owner",
  ChildrenImageSharpInternalType = "childrenImageSharp___internal___type",
  ChildImageSharpFixedBase64 = "childImageSharp___fixed___base64",
  ChildImageSharpFixedTracedSvg = "childImageSharp___fixed___tracedSVG",
  ChildImageSharpFixedAspectRatio = "childImageSharp___fixed___aspectRatio",
  ChildImageSharpFixedWidth = "childImageSharp___fixed___width",
  ChildImageSharpFixedHeight = "childImageSharp___fixed___height",
  ChildImageSharpFixedSrc = "childImageSharp___fixed___src",
  ChildImageSharpFixedSrcSet = "childImageSharp___fixed___srcSet",
  ChildImageSharpFixedSrcWebp = "childImageSharp___fixed___srcWebp",
  ChildImageSharpFixedSrcSetWebp = "childImageSharp___fixed___srcSetWebp",
  ChildImageSharpFixedOriginalName = "childImageSharp___fixed___originalName",
  ChildImageSharpFluidBase64 = "childImageSharp___fluid___base64",
  ChildImageSharpFluidTracedSvg = "childImageSharp___fluid___tracedSVG",
  ChildImageSharpFluidAspectRatio = "childImageSharp___fluid___aspectRatio",
  ChildImageSharpFluidSrc = "childImageSharp___fluid___src",
  ChildImageSharpFluidSrcSet = "childImageSharp___fluid___srcSet",
  ChildImageSharpFluidSrcWebp = "childImageSharp___fluid___srcWebp",
  ChildImageSharpFluidSrcSetWebp = "childImageSharp___fluid___srcSetWebp",
  ChildImageSharpFluidSizes = "childImageSharp___fluid___sizes",
  ChildImageSharpFluidOriginalImg = "childImageSharp___fluid___originalImg",
  ChildImageSharpFluidOriginalName = "childImageSharp___fluid___originalName",
  ChildImageSharpFluidPresentationWidth = "childImageSharp___fluid___presentationWidth",
  ChildImageSharpFluidPresentationHeight = "childImageSharp___fluid___presentationHeight",
  ChildImageSharpGatsbyImageData = "childImageSharp___gatsbyImageData",
  ChildImageSharpOriginalWidth = "childImageSharp___original___width",
  ChildImageSharpOriginalHeight = "childImageSharp___original___height",
  ChildImageSharpOriginalSrc = "childImageSharp___original___src",
  ChildImageSharpResizeSrc = "childImageSharp___resize___src",
  ChildImageSharpResizeTracedSvg = "childImageSharp___resize___tracedSVG",
  ChildImageSharpResizeWidth = "childImageSharp___resize___width",
  ChildImageSharpResizeHeight = "childImageSharp___resize___height",
  ChildImageSharpResizeAspectRatio = "childImageSharp___resize___aspectRatio",
  ChildImageSharpResizeOriginalName = "childImageSharp___resize___originalName",
  ChildImageSharpId = "childImageSharp___id",
  ChildImageSharpParentId = "childImageSharp___parent___id",
  ChildImageSharpParentParentId = "childImageSharp___parent___parent___id",
  ChildImageSharpParentParentChildren = "childImageSharp___parent___parent___children",
  ChildImageSharpParentChildren = "childImageSharp___parent___children",
  ChildImageSharpParentChildrenId = "childImageSharp___parent___children___id",
  ChildImageSharpParentChildrenChildren = "childImageSharp___parent___children___children",
  ChildImageSharpParentInternalContent = "childImageSharp___parent___internal___content",
  ChildImageSharpParentInternalContentDigest = "childImageSharp___parent___internal___contentDigest",
  ChildImageSharpParentInternalDescription = "childImageSharp___parent___internal___description",
  ChildImageSharpParentInternalFieldOwners = "childImageSharp___parent___internal___fieldOwners",
  ChildImageSharpParentInternalIgnoreType = "childImageSharp___parent___internal___ignoreType",
  ChildImageSharpParentInternalMediaType = "childImageSharp___parent___internal___mediaType",
  ChildImageSharpParentInternalOwner = "childImageSharp___parent___internal___owner",
  ChildImageSharpParentInternalType = "childImageSharp___parent___internal___type",
  ChildImageSharpChildren = "childImageSharp___children",
  ChildImageSharpChildrenId = "childImageSharp___children___id",
  ChildImageSharpChildrenParentId = "childImageSharp___children___parent___id",
  ChildImageSharpChildrenParentChildren = "childImageSharp___children___parent___children",
  ChildImageSharpChildrenChildren = "childImageSharp___children___children",
  ChildImageSharpChildrenChildrenId = "childImageSharp___children___children___id",
  ChildImageSharpChildrenChildrenChildren = "childImageSharp___children___children___children",
  ChildImageSharpChildrenInternalContent = "childImageSharp___children___internal___content",
  ChildImageSharpChildrenInternalContentDigest = "childImageSharp___children___internal___contentDigest",
  ChildImageSharpChildrenInternalDescription = "childImageSharp___children___internal___description",
  ChildImageSharpChildrenInternalFieldOwners = "childImageSharp___children___internal___fieldOwners",
  ChildImageSharpChildrenInternalIgnoreType = "childImageSharp___children___internal___ignoreType",
  ChildImageSharpChildrenInternalMediaType = "childImageSharp___children___internal___mediaType",
  ChildImageSharpChildrenInternalOwner = "childImageSharp___children___internal___owner",
  ChildImageSharpChildrenInternalType = "childImageSharp___children___internal___type",
  ChildImageSharpInternalContent = "childImageSharp___internal___content",
  ChildImageSharpInternalContentDigest = "childImageSharp___internal___contentDigest",
  ChildImageSharpInternalDescription = "childImageSharp___internal___description",
  ChildImageSharpInternalFieldOwners = "childImageSharp___internal___fieldOwners",
  ChildImageSharpInternalIgnoreType = "childImageSharp___internal___ignoreType",
  ChildImageSharpInternalMediaType = "childImageSharp___internal___mediaType",
  ChildImageSharpInternalOwner = "childImageSharp___internal___owner",
  ChildImageSharpInternalType = "childImageSharp___internal___type",
  ChildrenMarkdownRemark = "childrenMarkdownRemark",
  ChildrenMarkdownRemarkId = "childrenMarkdownRemark___id",
  ChildrenMarkdownRemarkHeroSourceInstanceName = "childrenMarkdownRemark___hero___sourceInstanceName",
  ChildrenMarkdownRemarkHeroAbsolutePath = "childrenMarkdownRemark___hero___absolutePath",
  ChildrenMarkdownRemarkHeroRelativePath = "childrenMarkdownRemark___hero___relativePath",
  ChildrenMarkdownRemarkHeroExtension = "childrenMarkdownRemark___hero___extension",
  ChildrenMarkdownRemarkHeroSize = "childrenMarkdownRemark___hero___size",
  ChildrenMarkdownRemarkHeroPrettySize = "childrenMarkdownRemark___hero___prettySize",
  ChildrenMarkdownRemarkHeroModifiedTime = "childrenMarkdownRemark___hero___modifiedTime",
  ChildrenMarkdownRemarkHeroAccessTime = "childrenMarkdownRemark___hero___accessTime",
  ChildrenMarkdownRemarkHeroChangeTime = "childrenMarkdownRemark___hero___changeTime",
  ChildrenMarkdownRemarkHeroBirthTime = "childrenMarkdownRemark___hero___birthTime",
  ChildrenMarkdownRemarkHeroRoot = "childrenMarkdownRemark___hero___root",
  ChildrenMarkdownRemarkHeroDir = "childrenMarkdownRemark___hero___dir",
  ChildrenMarkdownRemarkHeroBase = "childrenMarkdownRemark___hero___base",
  ChildrenMarkdownRemarkHeroExt = "childrenMarkdownRemark___hero___ext",
  ChildrenMarkdownRemarkHeroName = "childrenMarkdownRemark___hero___name",
  ChildrenMarkdownRemarkHeroRelativeDirectory = "childrenMarkdownRemark___hero___relativeDirectory",
  ChildrenMarkdownRemarkHeroDev = "childrenMarkdownRemark___hero___dev",
  ChildrenMarkdownRemarkHeroMode = "childrenMarkdownRemark___hero___mode",
  ChildrenMarkdownRemarkHeroNlink = "childrenMarkdownRemark___hero___nlink",
  ChildrenMarkdownRemarkHeroUid = "childrenMarkdownRemark___hero___uid",
  ChildrenMarkdownRemarkHeroGid = "childrenMarkdownRemark___hero___gid",
  ChildrenMarkdownRemarkHeroRdev = "childrenMarkdownRemark___hero___rdev",
  ChildrenMarkdownRemarkHeroIno = "childrenMarkdownRemark___hero___ino",
  ChildrenMarkdownRemarkHeroAtimeMs = "childrenMarkdownRemark___hero___atimeMs",
  ChildrenMarkdownRemarkHeroMtimeMs = "childrenMarkdownRemark___hero___mtimeMs",
  ChildrenMarkdownRemarkHeroCtimeMs = "childrenMarkdownRemark___hero___ctimeMs",
  ChildrenMarkdownRemarkHeroAtime = "childrenMarkdownRemark___hero___atime",
  ChildrenMarkdownRemarkHeroMtime = "childrenMarkdownRemark___hero___mtime",
  ChildrenMarkdownRemarkHeroCtime = "childrenMarkdownRemark___hero___ctime",
  ChildrenMarkdownRemarkHeroBirthtime = "childrenMarkdownRemark___hero___birthtime",
  ChildrenMarkdownRemarkHeroBirthtimeMs = "childrenMarkdownRemark___hero___birthtimeMs",
  ChildrenMarkdownRemarkHeroBlksize = "childrenMarkdownRemark___hero___blksize",
  ChildrenMarkdownRemarkHeroBlocks = "childrenMarkdownRemark___hero___blocks",
  ChildrenMarkdownRemarkHeroUrl = "childrenMarkdownRemark___hero___url",
  ChildrenMarkdownRemarkHeroPublicUrl = "childrenMarkdownRemark___hero___publicURL",
  ChildrenMarkdownRemarkHeroChildrenImageSharp = "childrenMarkdownRemark___hero___childrenImageSharp",
  ChildrenMarkdownRemarkHeroChildrenImageSharpGatsbyImageData = "childrenMarkdownRemark___hero___childrenImageSharp___gatsbyImageData",
  ChildrenMarkdownRemarkHeroChildrenImageSharpId = "childrenMarkdownRemark___hero___childrenImageSharp___id",
  ChildrenMarkdownRemarkHeroChildrenImageSharpChildren = "childrenMarkdownRemark___hero___childrenImageSharp___children",
  ChildrenMarkdownRemarkHeroChildImageSharpGatsbyImageData = "childrenMarkdownRemark___hero___childImageSharp___gatsbyImageData",
  ChildrenMarkdownRemarkHeroChildImageSharpId = "childrenMarkdownRemark___hero___childImageSharp___id",
  ChildrenMarkdownRemarkHeroChildImageSharpChildren = "childrenMarkdownRemark___hero___childImageSharp___children",
  ChildrenMarkdownRemarkHeroChildrenMarkdownRemark = "childrenMarkdownRemark___hero___childrenMarkdownRemark",
  ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkId = "childrenMarkdownRemark___hero___childrenMarkdownRemark___id",
  ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkExcerpt = "childrenMarkdownRemark___hero___childrenMarkdownRemark___excerpt",
  ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkRawMarkdownBody = "childrenMarkdownRemark___hero___childrenMarkdownRemark___rawMarkdownBody",
  ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkFileAbsolutePath = "childrenMarkdownRemark___hero___childrenMarkdownRemark___fileAbsolutePath",
  ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkHtml = "childrenMarkdownRemark___hero___childrenMarkdownRemark___html",
  ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkHtmlAst = "childrenMarkdownRemark___hero___childrenMarkdownRemark___htmlAst",
  ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkExcerptAst = "childrenMarkdownRemark___hero___childrenMarkdownRemark___excerptAst",
  ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkHeadings = "childrenMarkdownRemark___hero___childrenMarkdownRemark___headings",
  ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkTimeToRead = "childrenMarkdownRemark___hero___childrenMarkdownRemark___timeToRead",
  ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkTableOfContents = "childrenMarkdownRemark___hero___childrenMarkdownRemark___tableOfContents",
  ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkChildren = "childrenMarkdownRemark___hero___childrenMarkdownRemark___children",
  ChildrenMarkdownRemarkHeroChildMarkdownRemarkId = "childrenMarkdownRemark___hero___childMarkdownRemark___id",
  ChildrenMarkdownRemarkHeroChildMarkdownRemarkExcerpt = "childrenMarkdownRemark___hero___childMarkdownRemark___excerpt",
  ChildrenMarkdownRemarkHeroChildMarkdownRemarkRawMarkdownBody = "childrenMarkdownRemark___hero___childMarkdownRemark___rawMarkdownBody",
  ChildrenMarkdownRemarkHeroChildMarkdownRemarkFileAbsolutePath = "childrenMarkdownRemark___hero___childMarkdownRemark___fileAbsolutePath",
  ChildrenMarkdownRemarkHeroChildMarkdownRemarkHtml = "childrenMarkdownRemark___hero___childMarkdownRemark___html",
  ChildrenMarkdownRemarkHeroChildMarkdownRemarkHtmlAst = "childrenMarkdownRemark___hero___childMarkdownRemark___htmlAst",
  ChildrenMarkdownRemarkHeroChildMarkdownRemarkExcerptAst = "childrenMarkdownRemark___hero___childMarkdownRemark___excerptAst",
  ChildrenMarkdownRemarkHeroChildMarkdownRemarkHeadings = "childrenMarkdownRemark___hero___childMarkdownRemark___headings",
  ChildrenMarkdownRemarkHeroChildMarkdownRemarkTimeToRead = "childrenMarkdownRemark___hero___childMarkdownRemark___timeToRead",
  ChildrenMarkdownRemarkHeroChildMarkdownRemarkTableOfContents = "childrenMarkdownRemark___hero___childMarkdownRemark___tableOfContents",
  ChildrenMarkdownRemarkHeroChildMarkdownRemarkChildren = "childrenMarkdownRemark___hero___childMarkdownRemark___children",
  ChildrenMarkdownRemarkHeroId = "childrenMarkdownRemark___hero___id",
  ChildrenMarkdownRemarkHeroParentId = "childrenMarkdownRemark___hero___parent___id",
  ChildrenMarkdownRemarkHeroParentChildren = "childrenMarkdownRemark___hero___parent___children",
  ChildrenMarkdownRemarkHeroChildren = "childrenMarkdownRemark___hero___children",
  ChildrenMarkdownRemarkHeroChildrenId = "childrenMarkdownRemark___hero___children___id",
  ChildrenMarkdownRemarkHeroChildrenChildren = "childrenMarkdownRemark___hero___children___children",
  ChildrenMarkdownRemarkHeroInternalContent = "childrenMarkdownRemark___hero___internal___content",
  ChildrenMarkdownRemarkHeroInternalContentDigest = "childrenMarkdownRemark___hero___internal___contentDigest",
  ChildrenMarkdownRemarkHeroInternalDescription = "childrenMarkdownRemark___hero___internal___description",
  ChildrenMarkdownRemarkHeroInternalFieldOwners = "childrenMarkdownRemark___hero___internal___fieldOwners",
  ChildrenMarkdownRemarkHeroInternalIgnoreType = "childrenMarkdownRemark___hero___internal___ignoreType",
  ChildrenMarkdownRemarkHeroInternalMediaType = "childrenMarkdownRemark___hero___internal___mediaType",
  ChildrenMarkdownRemarkHeroInternalOwner = "childrenMarkdownRemark___hero___internal___owner",
  ChildrenMarkdownRemarkHeroInternalType = "childrenMarkdownRemark___hero___internal___type",
  ChildrenMarkdownRemarkFrontmatterTitle = "childrenMarkdownRemark___frontmatter___title",
  ChildrenMarkdownRemarkFrontmatterLang = "childrenMarkdownRemark___frontmatter___lang",
  ChildrenMarkdownRemarkFrontmatterAuthor = "childrenMarkdownRemark___frontmatter___author",
  ChildrenMarkdownRemarkFrontmatterDate = "childrenMarkdownRemark___frontmatter___date",
  ChildrenMarkdownRemarkFrontmatterType = "childrenMarkdownRemark___frontmatter___type",
  ChildrenMarkdownRemarkFrontmatterExcerpt = "childrenMarkdownRemark___frontmatter___excerpt",
  ChildrenMarkdownRemarkFrontmatterHero = "childrenMarkdownRemark___frontmatter___hero",
  ChildrenMarkdownRemarkFrontmatterCategories = "childrenMarkdownRemark___frontmatter___categories",
  ChildrenMarkdownRemarkExcerpt = "childrenMarkdownRemark___excerpt",
  ChildrenMarkdownRemarkRawMarkdownBody = "childrenMarkdownRemark___rawMarkdownBody",
  ChildrenMarkdownRemarkFileAbsolutePath = "childrenMarkdownRemark___fileAbsolutePath",
  ChildrenMarkdownRemarkFieldsSlug = "childrenMarkdownRemark___fields___slug",
  ChildrenMarkdownRemarkHtml = "childrenMarkdownRemark___html",
  ChildrenMarkdownRemarkHtmlAst = "childrenMarkdownRemark___htmlAst",
  ChildrenMarkdownRemarkExcerptAst = "childrenMarkdownRemark___excerptAst",
  ChildrenMarkdownRemarkHeadings = "childrenMarkdownRemark___headings",
  ChildrenMarkdownRemarkHeadingsId = "childrenMarkdownRemark___headings___id",
  ChildrenMarkdownRemarkHeadingsValue = "childrenMarkdownRemark___headings___value",
  ChildrenMarkdownRemarkHeadingsDepth = "childrenMarkdownRemark___headings___depth",
  ChildrenMarkdownRemarkTimeToRead = "childrenMarkdownRemark___timeToRead",
  ChildrenMarkdownRemarkTableOfContents = "childrenMarkdownRemark___tableOfContents",
  ChildrenMarkdownRemarkWordCountParagraphs = "childrenMarkdownRemark___wordCount___paragraphs",
  ChildrenMarkdownRemarkWordCountSentences = "childrenMarkdownRemark___wordCount___sentences",
  ChildrenMarkdownRemarkWordCountWords = "childrenMarkdownRemark___wordCount___words",
  ChildrenMarkdownRemarkParentId = "childrenMarkdownRemark___parent___id",
  ChildrenMarkdownRemarkParentParentId = "childrenMarkdownRemark___parent___parent___id",
  ChildrenMarkdownRemarkParentParentChildren = "childrenMarkdownRemark___parent___parent___children",
  ChildrenMarkdownRemarkParentChildren = "childrenMarkdownRemark___parent___children",
  ChildrenMarkdownRemarkParentChildrenId = "childrenMarkdownRemark___parent___children___id",
  ChildrenMarkdownRemarkParentChildrenChildren = "childrenMarkdownRemark___parent___children___children",
  ChildrenMarkdownRemarkParentInternalContent = "childrenMarkdownRemark___parent___internal___content",
  ChildrenMarkdownRemarkParentInternalContentDigest = "childrenMarkdownRemark___parent___internal___contentDigest",
  ChildrenMarkdownRemarkParentInternalDescription = "childrenMarkdownRemark___parent___internal___description",
  ChildrenMarkdownRemarkParentInternalFieldOwners = "childrenMarkdownRemark___parent___internal___fieldOwners",
  ChildrenMarkdownRemarkParentInternalIgnoreType = "childrenMarkdownRemark___parent___internal___ignoreType",
  ChildrenMarkdownRemarkParentInternalMediaType = "childrenMarkdownRemark___parent___internal___mediaType",
  ChildrenMarkdownRemarkParentInternalOwner = "childrenMarkdownRemark___parent___internal___owner",
  ChildrenMarkdownRemarkParentInternalType = "childrenMarkdownRemark___parent___internal___type",
  ChildrenMarkdownRemarkChildren = "childrenMarkdownRemark___children",
  ChildrenMarkdownRemarkChildrenId = "childrenMarkdownRemark___children___id",
  ChildrenMarkdownRemarkChildrenParentId = "childrenMarkdownRemark___children___parent___id",
  ChildrenMarkdownRemarkChildrenParentChildren = "childrenMarkdownRemark___children___parent___children",
  ChildrenMarkdownRemarkChildrenChildren = "childrenMarkdownRemark___children___children",
  ChildrenMarkdownRemarkChildrenChildrenId = "childrenMarkdownRemark___children___children___id",
  ChildrenMarkdownRemarkChildrenChildrenChildren = "childrenMarkdownRemark___children___children___children",
  ChildrenMarkdownRemarkChildrenInternalContent = "childrenMarkdownRemark___children___internal___content",
  ChildrenMarkdownRemarkChildrenInternalContentDigest = "childrenMarkdownRemark___children___internal___contentDigest",
  ChildrenMarkdownRemarkChildrenInternalDescription = "childrenMarkdownRemark___children___internal___description",
  ChildrenMarkdownRemarkChildrenInternalFieldOwners = "childrenMarkdownRemark___children___internal___fieldOwners",
  ChildrenMarkdownRemarkChildrenInternalIgnoreType = "childrenMarkdownRemark___children___internal___ignoreType",
  ChildrenMarkdownRemarkChildrenInternalMediaType = "childrenMarkdownRemark___children___internal___mediaType",
  ChildrenMarkdownRemarkChildrenInternalOwner = "childrenMarkdownRemark___children___internal___owner",
  ChildrenMarkdownRemarkChildrenInternalType = "childrenMarkdownRemark___children___internal___type",
  ChildrenMarkdownRemarkInternalContent = "childrenMarkdownRemark___internal___content",
  ChildrenMarkdownRemarkInternalContentDigest = "childrenMarkdownRemark___internal___contentDigest",
  ChildrenMarkdownRemarkInternalDescription = "childrenMarkdownRemark___internal___description",
  ChildrenMarkdownRemarkInternalFieldOwners = "childrenMarkdownRemark___internal___fieldOwners",
  ChildrenMarkdownRemarkInternalIgnoreType = "childrenMarkdownRemark___internal___ignoreType",
  ChildrenMarkdownRemarkInternalMediaType = "childrenMarkdownRemark___internal___mediaType",
  ChildrenMarkdownRemarkInternalOwner = "childrenMarkdownRemark___internal___owner",
  ChildrenMarkdownRemarkInternalType = "childrenMarkdownRemark___internal___type",
  ChildMarkdownRemarkId = "childMarkdownRemark___id",
  ChildMarkdownRemarkHeroSourceInstanceName = "childMarkdownRemark___hero___sourceInstanceName",
  ChildMarkdownRemarkHeroAbsolutePath = "childMarkdownRemark___hero___absolutePath",
  ChildMarkdownRemarkHeroRelativePath = "childMarkdownRemark___hero___relativePath",
  ChildMarkdownRemarkHeroExtension = "childMarkdownRemark___hero___extension",
  ChildMarkdownRemarkHeroSize = "childMarkdownRemark___hero___size",
  ChildMarkdownRemarkHeroPrettySize = "childMarkdownRemark___hero___prettySize",
  ChildMarkdownRemarkHeroModifiedTime = "childMarkdownRemark___hero___modifiedTime",
  ChildMarkdownRemarkHeroAccessTime = "childMarkdownRemark___hero___accessTime",
  ChildMarkdownRemarkHeroChangeTime = "childMarkdownRemark___hero___changeTime",
  ChildMarkdownRemarkHeroBirthTime = "childMarkdownRemark___hero___birthTime",
  ChildMarkdownRemarkHeroRoot = "childMarkdownRemark___hero___root",
  ChildMarkdownRemarkHeroDir = "childMarkdownRemark___hero___dir",
  ChildMarkdownRemarkHeroBase = "childMarkdownRemark___hero___base",
  ChildMarkdownRemarkHeroExt = "childMarkdownRemark___hero___ext",
  ChildMarkdownRemarkHeroName = "childMarkdownRemark___hero___name",
  ChildMarkdownRemarkHeroRelativeDirectory = "childMarkdownRemark___hero___relativeDirectory",
  ChildMarkdownRemarkHeroDev = "childMarkdownRemark___hero___dev",
  ChildMarkdownRemarkHeroMode = "childMarkdownRemark___hero___mode",
  ChildMarkdownRemarkHeroNlink = "childMarkdownRemark___hero___nlink",
  ChildMarkdownRemarkHeroUid = "childMarkdownRemark___hero___uid",
  ChildMarkdownRemarkHeroGid = "childMarkdownRemark___hero___gid",
  ChildMarkdownRemarkHeroRdev = "childMarkdownRemark___hero___rdev",
  ChildMarkdownRemarkHeroIno = "childMarkdownRemark___hero___ino",
  ChildMarkdownRemarkHeroAtimeMs = "childMarkdownRemark___hero___atimeMs",
  ChildMarkdownRemarkHeroMtimeMs = "childMarkdownRemark___hero___mtimeMs",
  ChildMarkdownRemarkHeroCtimeMs = "childMarkdownRemark___hero___ctimeMs",
  ChildMarkdownRemarkHeroAtime = "childMarkdownRemark___hero___atime",
  ChildMarkdownRemarkHeroMtime = "childMarkdownRemark___hero___mtime",
  ChildMarkdownRemarkHeroCtime = "childMarkdownRemark___hero___ctime",
  ChildMarkdownRemarkHeroBirthtime = "childMarkdownRemark___hero___birthtime",
  ChildMarkdownRemarkHeroBirthtimeMs = "childMarkdownRemark___hero___birthtimeMs",
  ChildMarkdownRemarkHeroBlksize = "childMarkdownRemark___hero___blksize",
  ChildMarkdownRemarkHeroBlocks = "childMarkdownRemark___hero___blocks",
  ChildMarkdownRemarkHeroUrl = "childMarkdownRemark___hero___url",
  ChildMarkdownRemarkHeroPublicUrl = "childMarkdownRemark___hero___publicURL",
  ChildMarkdownRemarkHeroChildrenImageSharp = "childMarkdownRemark___hero___childrenImageSharp",
  ChildMarkdownRemarkHeroChildrenImageSharpGatsbyImageData = "childMarkdownRemark___hero___childrenImageSharp___gatsbyImageData",
  ChildMarkdownRemarkHeroChildrenImageSharpId = "childMarkdownRemark___hero___childrenImageSharp___id",
  ChildMarkdownRemarkHeroChildrenImageSharpChildren = "childMarkdownRemark___hero___childrenImageSharp___children",
  ChildMarkdownRemarkHeroChildImageSharpGatsbyImageData = "childMarkdownRemark___hero___childImageSharp___gatsbyImageData",
  ChildMarkdownRemarkHeroChildImageSharpId = "childMarkdownRemark___hero___childImageSharp___id",
  ChildMarkdownRemarkHeroChildImageSharpChildren = "childMarkdownRemark___hero___childImageSharp___children",
  ChildMarkdownRemarkHeroChildrenMarkdownRemark = "childMarkdownRemark___hero___childrenMarkdownRemark",
  ChildMarkdownRemarkHeroChildrenMarkdownRemarkId = "childMarkdownRemark___hero___childrenMarkdownRemark___id",
  ChildMarkdownRemarkHeroChildrenMarkdownRemarkExcerpt = "childMarkdownRemark___hero___childrenMarkdownRemark___excerpt",
  ChildMarkdownRemarkHeroChildrenMarkdownRemarkRawMarkdownBody = "childMarkdownRemark___hero___childrenMarkdownRemark___rawMarkdownBody",
  ChildMarkdownRemarkHeroChildrenMarkdownRemarkFileAbsolutePath = "childMarkdownRemark___hero___childrenMarkdownRemark___fileAbsolutePath",
  ChildMarkdownRemarkHeroChildrenMarkdownRemarkHtml = "childMarkdownRemark___hero___childrenMarkdownRemark___html",
  ChildMarkdownRemarkHeroChildrenMarkdownRemarkHtmlAst = "childMarkdownRemark___hero___childrenMarkdownRemark___htmlAst",
  ChildMarkdownRemarkHeroChildrenMarkdownRemarkExcerptAst = "childMarkdownRemark___hero___childrenMarkdownRemark___excerptAst",
  ChildMarkdownRemarkHeroChildrenMarkdownRemarkHeadings = "childMarkdownRemark___hero___childrenMarkdownRemark___headings",
  ChildMarkdownRemarkHeroChildrenMarkdownRemarkTimeToRead = "childMarkdownRemark___hero___childrenMarkdownRemark___timeToRead",
  ChildMarkdownRemarkHeroChildrenMarkdownRemarkTableOfContents = "childMarkdownRemark___hero___childrenMarkdownRemark___tableOfContents",
  ChildMarkdownRemarkHeroChildrenMarkdownRemarkChildren = "childMarkdownRemark___hero___childrenMarkdownRemark___children",
  ChildMarkdownRemarkHeroChildMarkdownRemarkId = "childMarkdownRemark___hero___childMarkdownRemark___id",
  ChildMarkdownRemarkHeroChildMarkdownRemarkExcerpt = "childMarkdownRemark___hero___childMarkdownRemark___excerpt",
  ChildMarkdownRemarkHeroChildMarkdownRemarkRawMarkdownBody = "childMarkdownRemark___hero___childMarkdownRemark___rawMarkdownBody",
  ChildMarkdownRemarkHeroChildMarkdownRemarkFileAbsolutePath = "childMarkdownRemark___hero___childMarkdownRemark___fileAbsolutePath",
  ChildMarkdownRemarkHeroChildMarkdownRemarkHtml = "childMarkdownRemark___hero___childMarkdownRemark___html",
  ChildMarkdownRemarkHeroChildMarkdownRemarkHtmlAst = "childMarkdownRemark___hero___childMarkdownRemark___htmlAst",
  ChildMarkdownRemarkHeroChildMarkdownRemarkExcerptAst = "childMarkdownRemark___hero___childMarkdownRemark___excerptAst",
  ChildMarkdownRemarkHeroChildMarkdownRemarkHeadings = "childMarkdownRemark___hero___childMarkdownRemark___headings",
  ChildMarkdownRemarkHeroChildMarkdownRemarkTimeToRead = "childMarkdownRemark___hero___childMarkdownRemark___timeToRead",
  ChildMarkdownRemarkHeroChildMarkdownRemarkTableOfContents = "childMarkdownRemark___hero___childMarkdownRemark___tableOfContents",
  ChildMarkdownRemarkHeroChildMarkdownRemarkChildren = "childMarkdownRemark___hero___childMarkdownRemark___children",
  ChildMarkdownRemarkHeroId = "childMarkdownRemark___hero___id",
  ChildMarkdownRemarkHeroParentId = "childMarkdownRemark___hero___parent___id",
  ChildMarkdownRemarkHeroParentChildren = "childMarkdownRemark___hero___parent___children",
  ChildMarkdownRemarkHeroChildren = "childMarkdownRemark___hero___children",
  ChildMarkdownRemarkHeroChildrenId = "childMarkdownRemark___hero___children___id",
  ChildMarkdownRemarkHeroChildrenChildren = "childMarkdownRemark___hero___children___children",
  ChildMarkdownRemarkHeroInternalContent = "childMarkdownRemark___hero___internal___content",
  ChildMarkdownRemarkHeroInternalContentDigest = "childMarkdownRemark___hero___internal___contentDigest",
  ChildMarkdownRemarkHeroInternalDescription = "childMarkdownRemark___hero___internal___description",
  ChildMarkdownRemarkHeroInternalFieldOwners = "childMarkdownRemark___hero___internal___fieldOwners",
  ChildMarkdownRemarkHeroInternalIgnoreType = "childMarkdownRemark___hero___internal___ignoreType",
  ChildMarkdownRemarkHeroInternalMediaType = "childMarkdownRemark___hero___internal___mediaType",
  ChildMarkdownRemarkHeroInternalOwner = "childMarkdownRemark___hero___internal___owner",
  ChildMarkdownRemarkHeroInternalType = "childMarkdownRemark___hero___internal___type",
  ChildMarkdownRemarkFrontmatterTitle = "childMarkdownRemark___frontmatter___title",
  ChildMarkdownRemarkFrontmatterLang = "childMarkdownRemark___frontmatter___lang",
  ChildMarkdownRemarkFrontmatterAuthor = "childMarkdownRemark___frontmatter___author",
  ChildMarkdownRemarkFrontmatterDate = "childMarkdownRemark___frontmatter___date",
  ChildMarkdownRemarkFrontmatterType = "childMarkdownRemark___frontmatter___type",
  ChildMarkdownRemarkFrontmatterExcerpt = "childMarkdownRemark___frontmatter___excerpt",
  ChildMarkdownRemarkFrontmatterHero = "childMarkdownRemark___frontmatter___hero",
  ChildMarkdownRemarkFrontmatterCategories = "childMarkdownRemark___frontmatter___categories",
  ChildMarkdownRemarkExcerpt = "childMarkdownRemark___excerpt",
  ChildMarkdownRemarkRawMarkdownBody = "childMarkdownRemark___rawMarkdownBody",
  ChildMarkdownRemarkFileAbsolutePath = "childMarkdownRemark___fileAbsolutePath",
  ChildMarkdownRemarkFieldsSlug = "childMarkdownRemark___fields___slug",
  ChildMarkdownRemarkHtml = "childMarkdownRemark___html",
  ChildMarkdownRemarkHtmlAst = "childMarkdownRemark___htmlAst",
  ChildMarkdownRemarkExcerptAst = "childMarkdownRemark___excerptAst",
  ChildMarkdownRemarkHeadings = "childMarkdownRemark___headings",
  ChildMarkdownRemarkHeadingsId = "childMarkdownRemark___headings___id",
  ChildMarkdownRemarkHeadingsValue = "childMarkdownRemark___headings___value",
  ChildMarkdownRemarkHeadingsDepth = "childMarkdownRemark___headings___depth",
  ChildMarkdownRemarkTimeToRead = "childMarkdownRemark___timeToRead",
  ChildMarkdownRemarkTableOfContents = "childMarkdownRemark___tableOfContents",
  ChildMarkdownRemarkWordCountParagraphs = "childMarkdownRemark___wordCount___paragraphs",
  ChildMarkdownRemarkWordCountSentences = "childMarkdownRemark___wordCount___sentences",
  ChildMarkdownRemarkWordCountWords = "childMarkdownRemark___wordCount___words",
  ChildMarkdownRemarkParentId = "childMarkdownRemark___parent___id",
  ChildMarkdownRemarkParentParentId = "childMarkdownRemark___parent___parent___id",
  ChildMarkdownRemarkParentParentChildren = "childMarkdownRemark___parent___parent___children",
  ChildMarkdownRemarkParentChildren = "childMarkdownRemark___parent___children",
  ChildMarkdownRemarkParentChildrenId = "childMarkdownRemark___parent___children___id",
  ChildMarkdownRemarkParentChildrenChildren = "childMarkdownRemark___parent___children___children",
  ChildMarkdownRemarkParentInternalContent = "childMarkdownRemark___parent___internal___content",
  ChildMarkdownRemarkParentInternalContentDigest = "childMarkdownRemark___parent___internal___contentDigest",
  ChildMarkdownRemarkParentInternalDescription = "childMarkdownRemark___parent___internal___description",
  ChildMarkdownRemarkParentInternalFieldOwners = "childMarkdownRemark___parent___internal___fieldOwners",
  ChildMarkdownRemarkParentInternalIgnoreType = "childMarkdownRemark___parent___internal___ignoreType",
  ChildMarkdownRemarkParentInternalMediaType = "childMarkdownRemark___parent___internal___mediaType",
  ChildMarkdownRemarkParentInternalOwner = "childMarkdownRemark___parent___internal___owner",
  ChildMarkdownRemarkParentInternalType = "childMarkdownRemark___parent___internal___type",
  ChildMarkdownRemarkChildren = "childMarkdownRemark___children",
  ChildMarkdownRemarkChildrenId = "childMarkdownRemark___children___id",
  ChildMarkdownRemarkChildrenParentId = "childMarkdownRemark___children___parent___id",
  ChildMarkdownRemarkChildrenParentChildren = "childMarkdownRemark___children___parent___children",
  ChildMarkdownRemarkChildrenChildren = "childMarkdownRemark___children___children",
  ChildMarkdownRemarkChildrenChildrenId = "childMarkdownRemark___children___children___id",
  ChildMarkdownRemarkChildrenChildrenChildren = "childMarkdownRemark___children___children___children",
  ChildMarkdownRemarkChildrenInternalContent = "childMarkdownRemark___children___internal___content",
  ChildMarkdownRemarkChildrenInternalContentDigest = "childMarkdownRemark___children___internal___contentDigest",
  ChildMarkdownRemarkChildrenInternalDescription = "childMarkdownRemark___children___internal___description",
  ChildMarkdownRemarkChildrenInternalFieldOwners = "childMarkdownRemark___children___internal___fieldOwners",
  ChildMarkdownRemarkChildrenInternalIgnoreType = "childMarkdownRemark___children___internal___ignoreType",
  ChildMarkdownRemarkChildrenInternalMediaType = "childMarkdownRemark___children___internal___mediaType",
  ChildMarkdownRemarkChildrenInternalOwner = "childMarkdownRemark___children___internal___owner",
  ChildMarkdownRemarkChildrenInternalType = "childMarkdownRemark___children___internal___type",
  ChildMarkdownRemarkInternalContent = "childMarkdownRemark___internal___content",
  ChildMarkdownRemarkInternalContentDigest = "childMarkdownRemark___internal___contentDigest",
  ChildMarkdownRemarkInternalDescription = "childMarkdownRemark___internal___description",
  ChildMarkdownRemarkInternalFieldOwners = "childMarkdownRemark___internal___fieldOwners",
  ChildMarkdownRemarkInternalIgnoreType = "childMarkdownRemark___internal___ignoreType",
  ChildMarkdownRemarkInternalMediaType = "childMarkdownRemark___internal___mediaType",
  ChildMarkdownRemarkInternalOwner = "childMarkdownRemark___internal___owner",
  ChildMarkdownRemarkInternalType = "childMarkdownRemark___internal___type",
  Id = "id",
  ParentId = "parent___id",
  ParentParentId = "parent___parent___id",
  ParentParentParentId = "parent___parent___parent___id",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentChildren = "parent___children",
  ParentChildrenId = "parent___children___id",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  Children = "children",
  ChildrenId = "children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentParentId = "children___parent___parent___id",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenChildren = "children___children",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
}

export type FileFilterInput = {
  readonly sourceInstanceName: Maybe<StringQueryOperatorInput>;
  readonly absolutePath: Maybe<StringQueryOperatorInput>;
  readonly relativePath: Maybe<StringQueryOperatorInput>;
  readonly extension: Maybe<StringQueryOperatorInput>;
  readonly size: Maybe<IntQueryOperatorInput>;
  readonly prettySize: Maybe<StringQueryOperatorInput>;
  readonly modifiedTime: Maybe<DateQueryOperatorInput>;
  readonly accessTime: Maybe<DateQueryOperatorInput>;
  readonly changeTime: Maybe<DateQueryOperatorInput>;
  readonly birthTime: Maybe<DateQueryOperatorInput>;
  readonly root: Maybe<StringQueryOperatorInput>;
  readonly dir: Maybe<StringQueryOperatorInput>;
  readonly base: Maybe<StringQueryOperatorInput>;
  readonly ext: Maybe<StringQueryOperatorInput>;
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly relativeDirectory: Maybe<StringQueryOperatorInput>;
  readonly dev: Maybe<IntQueryOperatorInput>;
  readonly mode: Maybe<IntQueryOperatorInput>;
  readonly nlink: Maybe<IntQueryOperatorInput>;
  readonly uid: Maybe<IntQueryOperatorInput>;
  readonly gid: Maybe<IntQueryOperatorInput>;
  readonly rdev: Maybe<IntQueryOperatorInput>;
  readonly ino: Maybe<FloatQueryOperatorInput>;
  readonly atimeMs: Maybe<FloatQueryOperatorInput>;
  readonly mtimeMs: Maybe<FloatQueryOperatorInput>;
  readonly ctimeMs: Maybe<FloatQueryOperatorInput>;
  readonly atime: Maybe<DateQueryOperatorInput>;
  readonly mtime: Maybe<DateQueryOperatorInput>;
  readonly ctime: Maybe<DateQueryOperatorInput>;
  readonly birthtime: Maybe<DateQueryOperatorInput>;
  readonly birthtimeMs: Maybe<FloatQueryOperatorInput>;
  readonly blksize: Maybe<IntQueryOperatorInput>;
  readonly blocks: Maybe<IntQueryOperatorInput>;
  readonly url: Maybe<StringQueryOperatorInput>;
  readonly publicURL: Maybe<StringQueryOperatorInput>;
  readonly childrenImageSharp: Maybe<ImageSharpFilterListInput>;
  readonly childImageSharp: Maybe<ImageSharpFilterInput>;
  readonly childrenMarkdownRemark: Maybe<MarkdownRemarkFilterListInput>;
  readonly childMarkdownRemark: Maybe<MarkdownRemarkFilterInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly internal: Maybe<InternalFilterInput>;
};

export type FileGroupConnection = {
  readonly __typename?: "FileGroupConnection";
  readonly totalCount: Scalars["Int"];
  readonly edges: ReadonlyArray<FileEdge>;
  readonly nodes: ReadonlyArray<File>;
  readonly pageInfo: PageInfo;
  readonly field: Scalars["String"];
  readonly fieldValue: Maybe<Scalars["String"]>;
};

export type FileSortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<FileFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};

export type FloatQueryOperatorInput = {
  readonly eq: Maybe<Scalars["Float"]>;
  readonly ne: Maybe<Scalars["Float"]>;
  readonly gt: Maybe<Scalars["Float"]>;
  readonly gte: Maybe<Scalars["Float"]>;
  readonly lt: Maybe<Scalars["Float"]>;
  readonly lte: Maybe<Scalars["Float"]>;
  readonly in: Maybe<ReadonlyArray<Maybe<Scalars["Float"]>>>;
  readonly nin: Maybe<ReadonlyArray<Maybe<Scalars["Float"]>>>;
};

export enum ImageCropFocus {
  Center = "CENTER",
  North = "NORTH",
  Northeast = "NORTHEAST",
  East = "EAST",
  Southeast = "SOUTHEAST",
  South = "SOUTH",
  Southwest = "SOUTHWEST",
  West = "WEST",
  Northwest = "NORTHWEST",
  Entropy = "ENTROPY",
  Attention = "ATTENTION",
}

export enum ImageFit {
  Cover = "COVER",
  Contain = "CONTAIN",
  Fill = "FILL",
  Inside = "INSIDE",
  Outside = "OUTSIDE",
}

export enum ImageFormat {
  NoChange = "NO_CHANGE",
  Auto = "AUTO",
  Jpg = "JPG",
  Png = "PNG",
  Webp = "WEBP",
  Avif = "AVIF",
}

export enum ImageLayout {
  Fixed = "FIXED",
  FullWidth = "FULL_WIDTH",
  Constrained = "CONSTRAINED",
}

export enum ImagePlaceholder {
  DominantColor = "DOMINANT_COLOR",
  TracedSvg = "TRACED_SVG",
  Blurred = "BLURRED",
  None = "NONE",
}

export type ImageSharp = Node & {
  readonly __typename?: "ImageSharp";
  readonly fixed: Maybe<ImageSharpFixed>;
  readonly fluid: Maybe<ImageSharpFluid>;
  readonly gatsbyImageData: Scalars["JSON"];
  readonly original: Maybe<ImageSharpOriginal>;
  readonly resize: Maybe<ImageSharpResize>;
  readonly id: Scalars["ID"];
  readonly parent: Maybe<Node>;
  readonly children: ReadonlyArray<Node>;
  readonly internal: Internal;
};

export type ImageSharpFixedArgs = {
  width: Maybe<Scalars["Int"]>;
  height: Maybe<Scalars["Int"]>;
  base64Width: Maybe<Scalars["Int"]>;
  jpegProgressive?: Maybe<Scalars["Boolean"]>;
  pngCompressionSpeed?: Maybe<Scalars["Int"]>;
  grayscale?: Maybe<Scalars["Boolean"]>;
  duotone: Maybe<DuotoneGradient>;
  traceSVG: Maybe<Potrace>;
  quality: Maybe<Scalars["Int"]>;
  jpegQuality: Maybe<Scalars["Int"]>;
  pngQuality: Maybe<Scalars["Int"]>;
  webpQuality: Maybe<Scalars["Int"]>;
  toFormat?: Maybe<ImageFormat>;
  toFormatBase64?: Maybe<ImageFormat>;
  cropFocus?: Maybe<ImageCropFocus>;
  fit?: Maybe<ImageFit>;
  background?: Maybe<Scalars["String"]>;
  rotate?: Maybe<Scalars["Int"]>;
  trim?: Maybe<Scalars["Float"]>;
};

export type ImageSharpFluidArgs = {
  maxWidth: Maybe<Scalars["Int"]>;
  maxHeight: Maybe<Scalars["Int"]>;
  base64Width: Maybe<Scalars["Int"]>;
  grayscale?: Maybe<Scalars["Boolean"]>;
  jpegProgressive?: Maybe<Scalars["Boolean"]>;
  pngCompressionSpeed?: Maybe<Scalars["Int"]>;
  duotone: Maybe<DuotoneGradient>;
  traceSVG: Maybe<Potrace>;
  quality: Maybe<Scalars["Int"]>;
  jpegQuality: Maybe<Scalars["Int"]>;
  pngQuality: Maybe<Scalars["Int"]>;
  webpQuality: Maybe<Scalars["Int"]>;
  toFormat?: Maybe<ImageFormat>;
  toFormatBase64?: Maybe<ImageFormat>;
  cropFocus?: Maybe<ImageCropFocus>;
  fit?: Maybe<ImageFit>;
  background?: Maybe<Scalars["String"]>;
  rotate?: Maybe<Scalars["Int"]>;
  trim?: Maybe<Scalars["Float"]>;
  sizes?: Maybe<Scalars["String"]>;
  srcSetBreakpoints?: Maybe<ReadonlyArray<Maybe<Scalars["Int"]>>>;
};

export type ImageSharpGatsbyImageDataArgs = {
  layout?: Maybe<ImageLayout>;
  width: Maybe<Scalars["Int"]>;
  height: Maybe<Scalars["Int"]>;
  aspectRatio: Maybe<Scalars["Float"]>;
  placeholder: Maybe<ImagePlaceholder>;
  blurredOptions: Maybe<BlurredOptions>;
  tracedSVGOptions: Maybe<Potrace>;
  formats: Maybe<ReadonlyArray<Maybe<ImageFormat>>>;
  outputPixelDensities: Maybe<ReadonlyArray<Maybe<Scalars["Float"]>>>;
  breakpoints: Maybe<ReadonlyArray<Maybe<Scalars["Int"]>>>;
  sizes: Maybe<Scalars["String"]>;
  quality: Maybe<Scalars["Int"]>;
  jpgOptions: Maybe<JpgOptions>;
  pngOptions: Maybe<PngOptions>;
  webpOptions: Maybe<WebPOptions>;
  avifOptions: Maybe<AvifOptions>;
  transformOptions: Maybe<TransformOptions>;
  backgroundColor: Maybe<Scalars["String"]>;
};

export type ImageSharpResizeArgs = {
  width: Maybe<Scalars["Int"]>;
  height: Maybe<Scalars["Int"]>;
  quality: Maybe<Scalars["Int"]>;
  jpegQuality: Maybe<Scalars["Int"]>;
  pngQuality: Maybe<Scalars["Int"]>;
  webpQuality: Maybe<Scalars["Int"]>;
  jpegProgressive?: Maybe<Scalars["Boolean"]>;
  pngCompressionLevel?: Maybe<Scalars["Int"]>;
  pngCompressionSpeed?: Maybe<Scalars["Int"]>;
  grayscale?: Maybe<Scalars["Boolean"]>;
  duotone: Maybe<DuotoneGradient>;
  base64?: Maybe<Scalars["Boolean"]>;
  traceSVG: Maybe<Potrace>;
  toFormat?: Maybe<ImageFormat>;
  cropFocus?: Maybe<ImageCropFocus>;
  fit?: Maybe<ImageFit>;
  background?: Maybe<Scalars["String"]>;
  rotate?: Maybe<Scalars["Int"]>;
  trim?: Maybe<Scalars["Float"]>;
};

export type ImageSharpConnection = {
  readonly __typename?: "ImageSharpConnection";
  readonly totalCount: Scalars["Int"];
  readonly edges: ReadonlyArray<ImageSharpEdge>;
  readonly nodes: ReadonlyArray<ImageSharp>;
  readonly pageInfo: PageInfo;
  readonly distinct: ReadonlyArray<Scalars["String"]>;
  readonly group: ReadonlyArray<ImageSharpGroupConnection>;
};

export type ImageSharpConnectionDistinctArgs = {
  field: ImageSharpFieldsEnum;
};

export type ImageSharpConnectionGroupArgs = {
  skip: Maybe<Scalars["Int"]>;
  limit: Maybe<Scalars["Int"]>;
  field: ImageSharpFieldsEnum;
};

export type ImageSharpEdge = {
  readonly __typename?: "ImageSharpEdge";
  readonly next: Maybe<ImageSharp>;
  readonly node: ImageSharp;
  readonly previous: Maybe<ImageSharp>;
};

export enum ImageSharpFieldsEnum {
  FixedBase64 = "fixed___base64",
  FixedTracedSvg = "fixed___tracedSVG",
  FixedAspectRatio = "fixed___aspectRatio",
  FixedWidth = "fixed___width",
  FixedHeight = "fixed___height",
  FixedSrc = "fixed___src",
  FixedSrcSet = "fixed___srcSet",
  FixedSrcWebp = "fixed___srcWebp",
  FixedSrcSetWebp = "fixed___srcSetWebp",
  FixedOriginalName = "fixed___originalName",
  FluidBase64 = "fluid___base64",
  FluidTracedSvg = "fluid___tracedSVG",
  FluidAspectRatio = "fluid___aspectRatio",
  FluidSrc = "fluid___src",
  FluidSrcSet = "fluid___srcSet",
  FluidSrcWebp = "fluid___srcWebp",
  FluidSrcSetWebp = "fluid___srcSetWebp",
  FluidSizes = "fluid___sizes",
  FluidOriginalImg = "fluid___originalImg",
  FluidOriginalName = "fluid___originalName",
  FluidPresentationWidth = "fluid___presentationWidth",
  FluidPresentationHeight = "fluid___presentationHeight",
  GatsbyImageData = "gatsbyImageData",
  OriginalWidth = "original___width",
  OriginalHeight = "original___height",
  OriginalSrc = "original___src",
  ResizeSrc = "resize___src",
  ResizeTracedSvg = "resize___tracedSVG",
  ResizeWidth = "resize___width",
  ResizeHeight = "resize___height",
  ResizeAspectRatio = "resize___aspectRatio",
  ResizeOriginalName = "resize___originalName",
  Id = "id",
  ParentId = "parent___id",
  ParentParentId = "parent___parent___id",
  ParentParentParentId = "parent___parent___parent___id",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentChildren = "parent___children",
  ParentChildrenId = "parent___children___id",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  Children = "children",
  ChildrenId = "children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentParentId = "children___parent___parent___id",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenChildren = "children___children",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
}

export type ImageSharpFilterInput = {
  readonly fixed: Maybe<ImageSharpFixedFilterInput>;
  readonly fluid: Maybe<ImageSharpFluidFilterInput>;
  readonly gatsbyImageData: Maybe<JsonQueryOperatorInput>;
  readonly original: Maybe<ImageSharpOriginalFilterInput>;
  readonly resize: Maybe<ImageSharpResizeFilterInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly internal: Maybe<InternalFilterInput>;
};

export type ImageSharpFilterListInput = {
  readonly elemMatch: Maybe<ImageSharpFilterInput>;
};

export type ImageSharpFixed = {
  readonly __typename?: "ImageSharpFixed";
  readonly base64: Maybe<Scalars["String"]>;
  readonly tracedSVG: Maybe<Scalars["String"]>;
  readonly aspectRatio: Maybe<Scalars["Float"]>;
  readonly width: Scalars["Float"];
  readonly height: Scalars["Float"];
  readonly src: Scalars["String"];
  readonly srcSet: Scalars["String"];
  readonly srcWebp: Maybe<Scalars["String"]>;
  readonly srcSetWebp: Maybe<Scalars["String"]>;
  readonly originalName: Maybe<Scalars["String"]>;
};

export type ImageSharpFixedFilterInput = {
  readonly base64: Maybe<StringQueryOperatorInput>;
  readonly tracedSVG: Maybe<StringQueryOperatorInput>;
  readonly aspectRatio: Maybe<FloatQueryOperatorInput>;
  readonly width: Maybe<FloatQueryOperatorInput>;
  readonly height: Maybe<FloatQueryOperatorInput>;
  readonly src: Maybe<StringQueryOperatorInput>;
  readonly srcSet: Maybe<StringQueryOperatorInput>;
  readonly srcWebp: Maybe<StringQueryOperatorInput>;
  readonly srcSetWebp: Maybe<StringQueryOperatorInput>;
  readonly originalName: Maybe<StringQueryOperatorInput>;
};

export type ImageSharpFluid = {
  readonly __typename?: "ImageSharpFluid";
  readonly base64: Maybe<Scalars["String"]>;
  readonly tracedSVG: Maybe<Scalars["String"]>;
  readonly aspectRatio: Scalars["Float"];
  readonly src: Scalars["String"];
  readonly srcSet: Scalars["String"];
  readonly srcWebp: Maybe<Scalars["String"]>;
  readonly srcSetWebp: Maybe<Scalars["String"]>;
  readonly sizes: Scalars["String"];
  readonly originalImg: Maybe<Scalars["String"]>;
  readonly originalName: Maybe<Scalars["String"]>;
  readonly presentationWidth: Scalars["Int"];
  readonly presentationHeight: Scalars["Int"];
};

export type ImageSharpFluidFilterInput = {
  readonly base64: Maybe<StringQueryOperatorInput>;
  readonly tracedSVG: Maybe<StringQueryOperatorInput>;
  readonly aspectRatio: Maybe<FloatQueryOperatorInput>;
  readonly src: Maybe<StringQueryOperatorInput>;
  readonly srcSet: Maybe<StringQueryOperatorInput>;
  readonly srcWebp: Maybe<StringQueryOperatorInput>;
  readonly srcSetWebp: Maybe<StringQueryOperatorInput>;
  readonly sizes: Maybe<StringQueryOperatorInput>;
  readonly originalImg: Maybe<StringQueryOperatorInput>;
  readonly originalName: Maybe<StringQueryOperatorInput>;
  readonly presentationWidth: Maybe<IntQueryOperatorInput>;
  readonly presentationHeight: Maybe<IntQueryOperatorInput>;
};

export type ImageSharpGroupConnection = {
  readonly __typename?: "ImageSharpGroupConnection";
  readonly totalCount: Scalars["Int"];
  readonly edges: ReadonlyArray<ImageSharpEdge>;
  readonly nodes: ReadonlyArray<ImageSharp>;
  readonly pageInfo: PageInfo;
  readonly field: Scalars["String"];
  readonly fieldValue: Maybe<Scalars["String"]>;
};

export type ImageSharpOriginal = {
  readonly __typename?: "ImageSharpOriginal";
  readonly width: Maybe<Scalars["Float"]>;
  readonly height: Maybe<Scalars["Float"]>;
  readonly src: Maybe<Scalars["String"]>;
};

export type ImageSharpOriginalFilterInput = {
  readonly width: Maybe<FloatQueryOperatorInput>;
  readonly height: Maybe<FloatQueryOperatorInput>;
  readonly src: Maybe<StringQueryOperatorInput>;
};

export type ImageSharpResize = {
  readonly __typename?: "ImageSharpResize";
  readonly src: Maybe<Scalars["String"]>;
  readonly tracedSVG: Maybe<Scalars["String"]>;
  readonly width: Maybe<Scalars["Int"]>;
  readonly height: Maybe<Scalars["Int"]>;
  readonly aspectRatio: Maybe<Scalars["Float"]>;
  readonly originalName: Maybe<Scalars["String"]>;
};

export type ImageSharpResizeFilterInput = {
  readonly src: Maybe<StringQueryOperatorInput>;
  readonly tracedSVG: Maybe<StringQueryOperatorInput>;
  readonly width: Maybe<IntQueryOperatorInput>;
  readonly height: Maybe<IntQueryOperatorInput>;
  readonly aspectRatio: Maybe<FloatQueryOperatorInput>;
  readonly originalName: Maybe<StringQueryOperatorInput>;
};

export type ImageSharpSortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<ImageSharpFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};

export type IntQueryOperatorInput = {
  readonly eq: Maybe<Scalars["Int"]>;
  readonly ne: Maybe<Scalars["Int"]>;
  readonly gt: Maybe<Scalars["Int"]>;
  readonly gte: Maybe<Scalars["Int"]>;
  readonly lt: Maybe<Scalars["Int"]>;
  readonly lte: Maybe<Scalars["Int"]>;
  readonly in: Maybe<ReadonlyArray<Maybe<Scalars["Int"]>>>;
  readonly nin: Maybe<ReadonlyArray<Maybe<Scalars["Int"]>>>;
};

export type Internal = {
  readonly __typename?: "Internal";
  readonly content: Maybe<Scalars["String"]>;
  readonly contentDigest: Scalars["String"];
  readonly description: Maybe<Scalars["String"]>;
  readonly fieldOwners: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
  readonly ignoreType: Maybe<Scalars["Boolean"]>;
  readonly mediaType: Maybe<Scalars["String"]>;
  readonly owner: Scalars["String"];
  readonly type: Scalars["String"];
};

export type InternalFilterInput = {
  readonly content: Maybe<StringQueryOperatorInput>;
  readonly contentDigest: Maybe<StringQueryOperatorInput>;
  readonly description: Maybe<StringQueryOperatorInput>;
  readonly fieldOwners: Maybe<StringQueryOperatorInput>;
  readonly ignoreType: Maybe<BooleanQueryOperatorInput>;
  readonly mediaType: Maybe<StringQueryOperatorInput>;
  readonly owner: Maybe<StringQueryOperatorInput>;
  readonly type: Maybe<StringQueryOperatorInput>;
};

export type JpgOptions = {
  readonly quality: Maybe<Scalars["Int"]>;
  readonly progressive: Maybe<Scalars["Boolean"]>;
};

export type JsonQueryOperatorInput = {
  readonly eq: Maybe<Scalars["JSON"]>;
  readonly ne: Maybe<Scalars["JSON"]>;
  readonly in: Maybe<ReadonlyArray<Maybe<Scalars["JSON"]>>>;
  readonly nin: Maybe<ReadonlyArray<Maybe<Scalars["JSON"]>>>;
  readonly regex: Maybe<Scalars["JSON"]>;
  readonly glob: Maybe<Scalars["JSON"]>;
};

export enum MarkdownExcerptFormats {
  Plain = "PLAIN",
  Html = "HTML",
  Markdown = "MARKDOWN",
}

export type MarkdownHeading = {
  readonly __typename?: "MarkdownHeading";
  readonly id: Maybe<Scalars["String"]>;
  readonly value: Maybe<Scalars["String"]>;
  readonly depth: Maybe<Scalars["Int"]>;
};

export type MarkdownHeadingFilterInput = {
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly value: Maybe<StringQueryOperatorInput>;
  readonly depth: Maybe<IntQueryOperatorInput>;
};

export type MarkdownHeadingFilterListInput = {
  readonly elemMatch: Maybe<MarkdownHeadingFilterInput>;
};

export enum MarkdownHeadingLevels {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
}

export type MarkdownRemark = Node & {
  readonly __typename?: "MarkdownRemark";
  readonly id: Scalars["ID"];
  readonly hero: Maybe<File>;
  readonly frontmatter: Maybe<MarkdownRemarkFrontmatter>;
  readonly excerpt: Maybe<Scalars["String"]>;
  readonly rawMarkdownBody: Maybe<Scalars["String"]>;
  readonly fileAbsolutePath: Maybe<Scalars["String"]>;
  readonly fields: Maybe<MarkdownRemarkFields>;
  readonly html: Maybe<Scalars["String"]>;
  readonly htmlAst: Maybe<Scalars["JSON"]>;
  readonly excerptAst: Maybe<Scalars["JSON"]>;
  readonly headings: Maybe<ReadonlyArray<Maybe<MarkdownHeading>>>;
  readonly timeToRead: Maybe<Scalars["Int"]>;
  readonly tableOfContents: Maybe<Scalars["String"]>;
  readonly wordCount: Maybe<MarkdownWordCount>;
  readonly parent: Maybe<Node>;
  readonly children: ReadonlyArray<Node>;
  readonly internal: Internal;
};

export type MarkdownRemarkExcerptArgs = {
  pruneLength?: Maybe<Scalars["Int"]>;
  truncate?: Maybe<Scalars["Boolean"]>;
  format?: Maybe<MarkdownExcerptFormats>;
};

export type MarkdownRemarkExcerptAstArgs = {
  pruneLength?: Maybe<Scalars["Int"]>;
  truncate?: Maybe<Scalars["Boolean"]>;
};

export type MarkdownRemarkHeadingsArgs = {
  depth: Maybe<MarkdownHeadingLevels>;
};

export type MarkdownRemarkTableOfContentsArgs = {
  absolute?: Maybe<Scalars["Boolean"]>;
  pathToSlugField?: Maybe<Scalars["String"]>;
  maxDepth: Maybe<Scalars["Int"]>;
  heading: Maybe<Scalars["String"]>;
};

export type MarkdownRemarkConnection = {
  readonly __typename?: "MarkdownRemarkConnection";
  readonly totalCount: Scalars["Int"];
  readonly edges: ReadonlyArray<MarkdownRemarkEdge>;
  readonly nodes: ReadonlyArray<MarkdownRemark>;
  readonly pageInfo: PageInfo;
  readonly distinct: ReadonlyArray<Scalars["String"]>;
  readonly group: ReadonlyArray<MarkdownRemarkGroupConnection>;
};

export type MarkdownRemarkConnectionDistinctArgs = {
  field: MarkdownRemarkFieldsEnum;
};

export type MarkdownRemarkConnectionGroupArgs = {
  skip: Maybe<Scalars["Int"]>;
  limit: Maybe<Scalars["Int"]>;
  field: MarkdownRemarkFieldsEnum;
};

export type MarkdownRemarkEdge = {
  readonly __typename?: "MarkdownRemarkEdge";
  readonly next: Maybe<MarkdownRemark>;
  readonly node: MarkdownRemark;
  readonly previous: Maybe<MarkdownRemark>;
};

export type MarkdownRemarkFields = {
  readonly __typename?: "MarkdownRemarkFields";
  readonly slug: Maybe<Scalars["String"]>;
};

export enum MarkdownRemarkFieldsEnum {
  Id = "id",
  HeroSourceInstanceName = "hero___sourceInstanceName",
  HeroAbsolutePath = "hero___absolutePath",
  HeroRelativePath = "hero___relativePath",
  HeroExtension = "hero___extension",
  HeroSize = "hero___size",
  HeroPrettySize = "hero___prettySize",
  HeroModifiedTime = "hero___modifiedTime",
  HeroAccessTime = "hero___accessTime",
  HeroChangeTime = "hero___changeTime",
  HeroBirthTime = "hero___birthTime",
  HeroRoot = "hero___root",
  HeroDir = "hero___dir",
  HeroBase = "hero___base",
  HeroExt = "hero___ext",
  HeroName = "hero___name",
  HeroRelativeDirectory = "hero___relativeDirectory",
  HeroDev = "hero___dev",
  HeroMode = "hero___mode",
  HeroNlink = "hero___nlink",
  HeroUid = "hero___uid",
  HeroGid = "hero___gid",
  HeroRdev = "hero___rdev",
  HeroIno = "hero___ino",
  HeroAtimeMs = "hero___atimeMs",
  HeroMtimeMs = "hero___mtimeMs",
  HeroCtimeMs = "hero___ctimeMs",
  HeroAtime = "hero___atime",
  HeroMtime = "hero___mtime",
  HeroCtime = "hero___ctime",
  HeroBirthtime = "hero___birthtime",
  HeroBirthtimeMs = "hero___birthtimeMs",
  HeroBlksize = "hero___blksize",
  HeroBlocks = "hero___blocks",
  HeroUrl = "hero___url",
  HeroPublicUrl = "hero___publicURL",
  HeroChildrenImageSharp = "hero___childrenImageSharp",
  HeroChildrenImageSharpFixedBase64 = "hero___childrenImageSharp___fixed___base64",
  HeroChildrenImageSharpFixedTracedSvg = "hero___childrenImageSharp___fixed___tracedSVG",
  HeroChildrenImageSharpFixedAspectRatio = "hero___childrenImageSharp___fixed___aspectRatio",
  HeroChildrenImageSharpFixedWidth = "hero___childrenImageSharp___fixed___width",
  HeroChildrenImageSharpFixedHeight = "hero___childrenImageSharp___fixed___height",
  HeroChildrenImageSharpFixedSrc = "hero___childrenImageSharp___fixed___src",
  HeroChildrenImageSharpFixedSrcSet = "hero___childrenImageSharp___fixed___srcSet",
  HeroChildrenImageSharpFixedSrcWebp = "hero___childrenImageSharp___fixed___srcWebp",
  HeroChildrenImageSharpFixedSrcSetWebp = "hero___childrenImageSharp___fixed___srcSetWebp",
  HeroChildrenImageSharpFixedOriginalName = "hero___childrenImageSharp___fixed___originalName",
  HeroChildrenImageSharpFluidBase64 = "hero___childrenImageSharp___fluid___base64",
  HeroChildrenImageSharpFluidTracedSvg = "hero___childrenImageSharp___fluid___tracedSVG",
  HeroChildrenImageSharpFluidAspectRatio = "hero___childrenImageSharp___fluid___aspectRatio",
  HeroChildrenImageSharpFluidSrc = "hero___childrenImageSharp___fluid___src",
  HeroChildrenImageSharpFluidSrcSet = "hero___childrenImageSharp___fluid___srcSet",
  HeroChildrenImageSharpFluidSrcWebp = "hero___childrenImageSharp___fluid___srcWebp",
  HeroChildrenImageSharpFluidSrcSetWebp = "hero___childrenImageSharp___fluid___srcSetWebp",
  HeroChildrenImageSharpFluidSizes = "hero___childrenImageSharp___fluid___sizes",
  HeroChildrenImageSharpFluidOriginalImg = "hero___childrenImageSharp___fluid___originalImg",
  HeroChildrenImageSharpFluidOriginalName = "hero___childrenImageSharp___fluid___originalName",
  HeroChildrenImageSharpFluidPresentationWidth = "hero___childrenImageSharp___fluid___presentationWidth",
  HeroChildrenImageSharpFluidPresentationHeight = "hero___childrenImageSharp___fluid___presentationHeight",
  HeroChildrenImageSharpGatsbyImageData = "hero___childrenImageSharp___gatsbyImageData",
  HeroChildrenImageSharpOriginalWidth = "hero___childrenImageSharp___original___width",
  HeroChildrenImageSharpOriginalHeight = "hero___childrenImageSharp___original___height",
  HeroChildrenImageSharpOriginalSrc = "hero___childrenImageSharp___original___src",
  HeroChildrenImageSharpResizeSrc = "hero___childrenImageSharp___resize___src",
  HeroChildrenImageSharpResizeTracedSvg = "hero___childrenImageSharp___resize___tracedSVG",
  HeroChildrenImageSharpResizeWidth = "hero___childrenImageSharp___resize___width",
  HeroChildrenImageSharpResizeHeight = "hero___childrenImageSharp___resize___height",
  HeroChildrenImageSharpResizeAspectRatio = "hero___childrenImageSharp___resize___aspectRatio",
  HeroChildrenImageSharpResizeOriginalName = "hero___childrenImageSharp___resize___originalName",
  HeroChildrenImageSharpId = "hero___childrenImageSharp___id",
  HeroChildrenImageSharpParentId = "hero___childrenImageSharp___parent___id",
  HeroChildrenImageSharpParentChildren = "hero___childrenImageSharp___parent___children",
  HeroChildrenImageSharpChildren = "hero___childrenImageSharp___children",
  HeroChildrenImageSharpChildrenId = "hero___childrenImageSharp___children___id",
  HeroChildrenImageSharpChildrenChildren = "hero___childrenImageSharp___children___children",
  HeroChildrenImageSharpInternalContent = "hero___childrenImageSharp___internal___content",
  HeroChildrenImageSharpInternalContentDigest = "hero___childrenImageSharp___internal___contentDigest",
  HeroChildrenImageSharpInternalDescription = "hero___childrenImageSharp___internal___description",
  HeroChildrenImageSharpInternalFieldOwners = "hero___childrenImageSharp___internal___fieldOwners",
  HeroChildrenImageSharpInternalIgnoreType = "hero___childrenImageSharp___internal___ignoreType",
  HeroChildrenImageSharpInternalMediaType = "hero___childrenImageSharp___internal___mediaType",
  HeroChildrenImageSharpInternalOwner = "hero___childrenImageSharp___internal___owner",
  HeroChildrenImageSharpInternalType = "hero___childrenImageSharp___internal___type",
  HeroChildImageSharpFixedBase64 = "hero___childImageSharp___fixed___base64",
  HeroChildImageSharpFixedTracedSvg = "hero___childImageSharp___fixed___tracedSVG",
  HeroChildImageSharpFixedAspectRatio = "hero___childImageSharp___fixed___aspectRatio",
  HeroChildImageSharpFixedWidth = "hero___childImageSharp___fixed___width",
  HeroChildImageSharpFixedHeight = "hero___childImageSharp___fixed___height",
  HeroChildImageSharpFixedSrc = "hero___childImageSharp___fixed___src",
  HeroChildImageSharpFixedSrcSet = "hero___childImageSharp___fixed___srcSet",
  HeroChildImageSharpFixedSrcWebp = "hero___childImageSharp___fixed___srcWebp",
  HeroChildImageSharpFixedSrcSetWebp = "hero___childImageSharp___fixed___srcSetWebp",
  HeroChildImageSharpFixedOriginalName = "hero___childImageSharp___fixed___originalName",
  HeroChildImageSharpFluidBase64 = "hero___childImageSharp___fluid___base64",
  HeroChildImageSharpFluidTracedSvg = "hero___childImageSharp___fluid___tracedSVG",
  HeroChildImageSharpFluidAspectRatio = "hero___childImageSharp___fluid___aspectRatio",
  HeroChildImageSharpFluidSrc = "hero___childImageSharp___fluid___src",
  HeroChildImageSharpFluidSrcSet = "hero___childImageSharp___fluid___srcSet",
  HeroChildImageSharpFluidSrcWebp = "hero___childImageSharp___fluid___srcWebp",
  HeroChildImageSharpFluidSrcSetWebp = "hero___childImageSharp___fluid___srcSetWebp",
  HeroChildImageSharpFluidSizes = "hero___childImageSharp___fluid___sizes",
  HeroChildImageSharpFluidOriginalImg = "hero___childImageSharp___fluid___originalImg",
  HeroChildImageSharpFluidOriginalName = "hero___childImageSharp___fluid___originalName",
  HeroChildImageSharpFluidPresentationWidth = "hero___childImageSharp___fluid___presentationWidth",
  HeroChildImageSharpFluidPresentationHeight = "hero___childImageSharp___fluid___presentationHeight",
  HeroChildImageSharpGatsbyImageData = "hero___childImageSharp___gatsbyImageData",
  HeroChildImageSharpOriginalWidth = "hero___childImageSharp___original___width",
  HeroChildImageSharpOriginalHeight = "hero___childImageSharp___original___height",
  HeroChildImageSharpOriginalSrc = "hero___childImageSharp___original___src",
  HeroChildImageSharpResizeSrc = "hero___childImageSharp___resize___src",
  HeroChildImageSharpResizeTracedSvg = "hero___childImageSharp___resize___tracedSVG",
  HeroChildImageSharpResizeWidth = "hero___childImageSharp___resize___width",
  HeroChildImageSharpResizeHeight = "hero___childImageSharp___resize___height",
  HeroChildImageSharpResizeAspectRatio = "hero___childImageSharp___resize___aspectRatio",
  HeroChildImageSharpResizeOriginalName = "hero___childImageSharp___resize___originalName",
  HeroChildImageSharpId = "hero___childImageSharp___id",
  HeroChildImageSharpParentId = "hero___childImageSharp___parent___id",
  HeroChildImageSharpParentChildren = "hero___childImageSharp___parent___children",
  HeroChildImageSharpChildren = "hero___childImageSharp___children",
  HeroChildImageSharpChildrenId = "hero___childImageSharp___children___id",
  HeroChildImageSharpChildrenChildren = "hero___childImageSharp___children___children",
  HeroChildImageSharpInternalContent = "hero___childImageSharp___internal___content",
  HeroChildImageSharpInternalContentDigest = "hero___childImageSharp___internal___contentDigest",
  HeroChildImageSharpInternalDescription = "hero___childImageSharp___internal___description",
  HeroChildImageSharpInternalFieldOwners = "hero___childImageSharp___internal___fieldOwners",
  HeroChildImageSharpInternalIgnoreType = "hero___childImageSharp___internal___ignoreType",
  HeroChildImageSharpInternalMediaType = "hero___childImageSharp___internal___mediaType",
  HeroChildImageSharpInternalOwner = "hero___childImageSharp___internal___owner",
  HeroChildImageSharpInternalType = "hero___childImageSharp___internal___type",
  HeroChildrenMarkdownRemark = "hero___childrenMarkdownRemark",
  HeroChildrenMarkdownRemarkId = "hero___childrenMarkdownRemark___id",
  HeroChildrenMarkdownRemarkHeroSourceInstanceName = "hero___childrenMarkdownRemark___hero___sourceInstanceName",
  HeroChildrenMarkdownRemarkHeroAbsolutePath = "hero___childrenMarkdownRemark___hero___absolutePath",
  HeroChildrenMarkdownRemarkHeroRelativePath = "hero___childrenMarkdownRemark___hero___relativePath",
  HeroChildrenMarkdownRemarkHeroExtension = "hero___childrenMarkdownRemark___hero___extension",
  HeroChildrenMarkdownRemarkHeroSize = "hero___childrenMarkdownRemark___hero___size",
  HeroChildrenMarkdownRemarkHeroPrettySize = "hero___childrenMarkdownRemark___hero___prettySize",
  HeroChildrenMarkdownRemarkHeroModifiedTime = "hero___childrenMarkdownRemark___hero___modifiedTime",
  HeroChildrenMarkdownRemarkHeroAccessTime = "hero___childrenMarkdownRemark___hero___accessTime",
  HeroChildrenMarkdownRemarkHeroChangeTime = "hero___childrenMarkdownRemark___hero___changeTime",
  HeroChildrenMarkdownRemarkHeroBirthTime = "hero___childrenMarkdownRemark___hero___birthTime",
  HeroChildrenMarkdownRemarkHeroRoot = "hero___childrenMarkdownRemark___hero___root",
  HeroChildrenMarkdownRemarkHeroDir = "hero___childrenMarkdownRemark___hero___dir",
  HeroChildrenMarkdownRemarkHeroBase = "hero___childrenMarkdownRemark___hero___base",
  HeroChildrenMarkdownRemarkHeroExt = "hero___childrenMarkdownRemark___hero___ext",
  HeroChildrenMarkdownRemarkHeroName = "hero___childrenMarkdownRemark___hero___name",
  HeroChildrenMarkdownRemarkHeroRelativeDirectory = "hero___childrenMarkdownRemark___hero___relativeDirectory",
  HeroChildrenMarkdownRemarkHeroDev = "hero___childrenMarkdownRemark___hero___dev",
  HeroChildrenMarkdownRemarkHeroMode = "hero___childrenMarkdownRemark___hero___mode",
  HeroChildrenMarkdownRemarkHeroNlink = "hero___childrenMarkdownRemark___hero___nlink",
  HeroChildrenMarkdownRemarkHeroUid = "hero___childrenMarkdownRemark___hero___uid",
  HeroChildrenMarkdownRemarkHeroGid = "hero___childrenMarkdownRemark___hero___gid",
  HeroChildrenMarkdownRemarkHeroRdev = "hero___childrenMarkdownRemark___hero___rdev",
  HeroChildrenMarkdownRemarkHeroIno = "hero___childrenMarkdownRemark___hero___ino",
  HeroChildrenMarkdownRemarkHeroAtimeMs = "hero___childrenMarkdownRemark___hero___atimeMs",
  HeroChildrenMarkdownRemarkHeroMtimeMs = "hero___childrenMarkdownRemark___hero___mtimeMs",
  HeroChildrenMarkdownRemarkHeroCtimeMs = "hero___childrenMarkdownRemark___hero___ctimeMs",
  HeroChildrenMarkdownRemarkHeroAtime = "hero___childrenMarkdownRemark___hero___atime",
  HeroChildrenMarkdownRemarkHeroMtime = "hero___childrenMarkdownRemark___hero___mtime",
  HeroChildrenMarkdownRemarkHeroCtime = "hero___childrenMarkdownRemark___hero___ctime",
  HeroChildrenMarkdownRemarkHeroBirthtime = "hero___childrenMarkdownRemark___hero___birthtime",
  HeroChildrenMarkdownRemarkHeroBirthtimeMs = "hero___childrenMarkdownRemark___hero___birthtimeMs",
  HeroChildrenMarkdownRemarkHeroBlksize = "hero___childrenMarkdownRemark___hero___blksize",
  HeroChildrenMarkdownRemarkHeroBlocks = "hero___childrenMarkdownRemark___hero___blocks",
  HeroChildrenMarkdownRemarkHeroUrl = "hero___childrenMarkdownRemark___hero___url",
  HeroChildrenMarkdownRemarkHeroPublicUrl = "hero___childrenMarkdownRemark___hero___publicURL",
  HeroChildrenMarkdownRemarkHeroChildrenImageSharp = "hero___childrenMarkdownRemark___hero___childrenImageSharp",
  HeroChildrenMarkdownRemarkHeroChildrenMarkdownRemark = "hero___childrenMarkdownRemark___hero___childrenMarkdownRemark",
  HeroChildrenMarkdownRemarkHeroId = "hero___childrenMarkdownRemark___hero___id",
  HeroChildrenMarkdownRemarkHeroChildren = "hero___childrenMarkdownRemark___hero___children",
  HeroChildrenMarkdownRemarkFrontmatterTitle = "hero___childrenMarkdownRemark___frontmatter___title",
  HeroChildrenMarkdownRemarkFrontmatterLang = "hero___childrenMarkdownRemark___frontmatter___lang",
  HeroChildrenMarkdownRemarkFrontmatterAuthor = "hero___childrenMarkdownRemark___frontmatter___author",
  HeroChildrenMarkdownRemarkFrontmatterDate = "hero___childrenMarkdownRemark___frontmatter___date",
  HeroChildrenMarkdownRemarkFrontmatterType = "hero___childrenMarkdownRemark___frontmatter___type",
  HeroChildrenMarkdownRemarkFrontmatterExcerpt = "hero___childrenMarkdownRemark___frontmatter___excerpt",
  HeroChildrenMarkdownRemarkFrontmatterHero = "hero___childrenMarkdownRemark___frontmatter___hero",
  HeroChildrenMarkdownRemarkFrontmatterCategories = "hero___childrenMarkdownRemark___frontmatter___categories",
  HeroChildrenMarkdownRemarkExcerpt = "hero___childrenMarkdownRemark___excerpt",
  HeroChildrenMarkdownRemarkRawMarkdownBody = "hero___childrenMarkdownRemark___rawMarkdownBody",
  HeroChildrenMarkdownRemarkFileAbsolutePath = "hero___childrenMarkdownRemark___fileAbsolutePath",
  HeroChildrenMarkdownRemarkFieldsSlug = "hero___childrenMarkdownRemark___fields___slug",
  HeroChildrenMarkdownRemarkHtml = "hero___childrenMarkdownRemark___html",
  HeroChildrenMarkdownRemarkHtmlAst = "hero___childrenMarkdownRemark___htmlAst",
  HeroChildrenMarkdownRemarkExcerptAst = "hero___childrenMarkdownRemark___excerptAst",
  HeroChildrenMarkdownRemarkHeadings = "hero___childrenMarkdownRemark___headings",
  HeroChildrenMarkdownRemarkHeadingsId = "hero___childrenMarkdownRemark___headings___id",
  HeroChildrenMarkdownRemarkHeadingsValue = "hero___childrenMarkdownRemark___headings___value",
  HeroChildrenMarkdownRemarkHeadingsDepth = "hero___childrenMarkdownRemark___headings___depth",
  HeroChildrenMarkdownRemarkTimeToRead = "hero___childrenMarkdownRemark___timeToRead",
  HeroChildrenMarkdownRemarkTableOfContents = "hero___childrenMarkdownRemark___tableOfContents",
  HeroChildrenMarkdownRemarkWordCountParagraphs = "hero___childrenMarkdownRemark___wordCount___paragraphs",
  HeroChildrenMarkdownRemarkWordCountSentences = "hero___childrenMarkdownRemark___wordCount___sentences",
  HeroChildrenMarkdownRemarkWordCountWords = "hero___childrenMarkdownRemark___wordCount___words",
  HeroChildrenMarkdownRemarkParentId = "hero___childrenMarkdownRemark___parent___id",
  HeroChildrenMarkdownRemarkParentChildren = "hero___childrenMarkdownRemark___parent___children",
  HeroChildrenMarkdownRemarkChildren = "hero___childrenMarkdownRemark___children",
  HeroChildrenMarkdownRemarkChildrenId = "hero___childrenMarkdownRemark___children___id",
  HeroChildrenMarkdownRemarkChildrenChildren = "hero___childrenMarkdownRemark___children___children",
  HeroChildrenMarkdownRemarkInternalContent = "hero___childrenMarkdownRemark___internal___content",
  HeroChildrenMarkdownRemarkInternalContentDigest = "hero___childrenMarkdownRemark___internal___contentDigest",
  HeroChildrenMarkdownRemarkInternalDescription = "hero___childrenMarkdownRemark___internal___description",
  HeroChildrenMarkdownRemarkInternalFieldOwners = "hero___childrenMarkdownRemark___internal___fieldOwners",
  HeroChildrenMarkdownRemarkInternalIgnoreType = "hero___childrenMarkdownRemark___internal___ignoreType",
  HeroChildrenMarkdownRemarkInternalMediaType = "hero___childrenMarkdownRemark___internal___mediaType",
  HeroChildrenMarkdownRemarkInternalOwner = "hero___childrenMarkdownRemark___internal___owner",
  HeroChildrenMarkdownRemarkInternalType = "hero___childrenMarkdownRemark___internal___type",
  HeroChildMarkdownRemarkId = "hero___childMarkdownRemark___id",
  HeroChildMarkdownRemarkHeroSourceInstanceName = "hero___childMarkdownRemark___hero___sourceInstanceName",
  HeroChildMarkdownRemarkHeroAbsolutePath = "hero___childMarkdownRemark___hero___absolutePath",
  HeroChildMarkdownRemarkHeroRelativePath = "hero___childMarkdownRemark___hero___relativePath",
  HeroChildMarkdownRemarkHeroExtension = "hero___childMarkdownRemark___hero___extension",
  HeroChildMarkdownRemarkHeroSize = "hero___childMarkdownRemark___hero___size",
  HeroChildMarkdownRemarkHeroPrettySize = "hero___childMarkdownRemark___hero___prettySize",
  HeroChildMarkdownRemarkHeroModifiedTime = "hero___childMarkdownRemark___hero___modifiedTime",
  HeroChildMarkdownRemarkHeroAccessTime = "hero___childMarkdownRemark___hero___accessTime",
  HeroChildMarkdownRemarkHeroChangeTime = "hero___childMarkdownRemark___hero___changeTime",
  HeroChildMarkdownRemarkHeroBirthTime = "hero___childMarkdownRemark___hero___birthTime",
  HeroChildMarkdownRemarkHeroRoot = "hero___childMarkdownRemark___hero___root",
  HeroChildMarkdownRemarkHeroDir = "hero___childMarkdownRemark___hero___dir",
  HeroChildMarkdownRemarkHeroBase = "hero___childMarkdownRemark___hero___base",
  HeroChildMarkdownRemarkHeroExt = "hero___childMarkdownRemark___hero___ext",
  HeroChildMarkdownRemarkHeroName = "hero___childMarkdownRemark___hero___name",
  HeroChildMarkdownRemarkHeroRelativeDirectory = "hero___childMarkdownRemark___hero___relativeDirectory",
  HeroChildMarkdownRemarkHeroDev = "hero___childMarkdownRemark___hero___dev",
  HeroChildMarkdownRemarkHeroMode = "hero___childMarkdownRemark___hero___mode",
  HeroChildMarkdownRemarkHeroNlink = "hero___childMarkdownRemark___hero___nlink",
  HeroChildMarkdownRemarkHeroUid = "hero___childMarkdownRemark___hero___uid",
  HeroChildMarkdownRemarkHeroGid = "hero___childMarkdownRemark___hero___gid",
  HeroChildMarkdownRemarkHeroRdev = "hero___childMarkdownRemark___hero___rdev",
  HeroChildMarkdownRemarkHeroIno = "hero___childMarkdownRemark___hero___ino",
  HeroChildMarkdownRemarkHeroAtimeMs = "hero___childMarkdownRemark___hero___atimeMs",
  HeroChildMarkdownRemarkHeroMtimeMs = "hero___childMarkdownRemark___hero___mtimeMs",
  HeroChildMarkdownRemarkHeroCtimeMs = "hero___childMarkdownRemark___hero___ctimeMs",
  HeroChildMarkdownRemarkHeroAtime = "hero___childMarkdownRemark___hero___atime",
  HeroChildMarkdownRemarkHeroMtime = "hero___childMarkdownRemark___hero___mtime",
  HeroChildMarkdownRemarkHeroCtime = "hero___childMarkdownRemark___hero___ctime",
  HeroChildMarkdownRemarkHeroBirthtime = "hero___childMarkdownRemark___hero___birthtime",
  HeroChildMarkdownRemarkHeroBirthtimeMs = "hero___childMarkdownRemark___hero___birthtimeMs",
  HeroChildMarkdownRemarkHeroBlksize = "hero___childMarkdownRemark___hero___blksize",
  HeroChildMarkdownRemarkHeroBlocks = "hero___childMarkdownRemark___hero___blocks",
  HeroChildMarkdownRemarkHeroUrl = "hero___childMarkdownRemark___hero___url",
  HeroChildMarkdownRemarkHeroPublicUrl = "hero___childMarkdownRemark___hero___publicURL",
  HeroChildMarkdownRemarkHeroChildrenImageSharp = "hero___childMarkdownRemark___hero___childrenImageSharp",
  HeroChildMarkdownRemarkHeroChildrenMarkdownRemark = "hero___childMarkdownRemark___hero___childrenMarkdownRemark",
  HeroChildMarkdownRemarkHeroId = "hero___childMarkdownRemark___hero___id",
  HeroChildMarkdownRemarkHeroChildren = "hero___childMarkdownRemark___hero___children",
  HeroChildMarkdownRemarkFrontmatterTitle = "hero___childMarkdownRemark___frontmatter___title",
  HeroChildMarkdownRemarkFrontmatterLang = "hero___childMarkdownRemark___frontmatter___lang",
  HeroChildMarkdownRemarkFrontmatterAuthor = "hero___childMarkdownRemark___frontmatter___author",
  HeroChildMarkdownRemarkFrontmatterDate = "hero___childMarkdownRemark___frontmatter___date",
  HeroChildMarkdownRemarkFrontmatterType = "hero___childMarkdownRemark___frontmatter___type",
  HeroChildMarkdownRemarkFrontmatterExcerpt = "hero___childMarkdownRemark___frontmatter___excerpt",
  HeroChildMarkdownRemarkFrontmatterHero = "hero___childMarkdownRemark___frontmatter___hero",
  HeroChildMarkdownRemarkFrontmatterCategories = "hero___childMarkdownRemark___frontmatter___categories",
  HeroChildMarkdownRemarkExcerpt = "hero___childMarkdownRemark___excerpt",
  HeroChildMarkdownRemarkRawMarkdownBody = "hero___childMarkdownRemark___rawMarkdownBody",
  HeroChildMarkdownRemarkFileAbsolutePath = "hero___childMarkdownRemark___fileAbsolutePath",
  HeroChildMarkdownRemarkFieldsSlug = "hero___childMarkdownRemark___fields___slug",
  HeroChildMarkdownRemarkHtml = "hero___childMarkdownRemark___html",
  HeroChildMarkdownRemarkHtmlAst = "hero___childMarkdownRemark___htmlAst",
  HeroChildMarkdownRemarkExcerptAst = "hero___childMarkdownRemark___excerptAst",
  HeroChildMarkdownRemarkHeadings = "hero___childMarkdownRemark___headings",
  HeroChildMarkdownRemarkHeadingsId = "hero___childMarkdownRemark___headings___id",
  HeroChildMarkdownRemarkHeadingsValue = "hero___childMarkdownRemark___headings___value",
  HeroChildMarkdownRemarkHeadingsDepth = "hero___childMarkdownRemark___headings___depth",
  HeroChildMarkdownRemarkTimeToRead = "hero___childMarkdownRemark___timeToRead",
  HeroChildMarkdownRemarkTableOfContents = "hero___childMarkdownRemark___tableOfContents",
  HeroChildMarkdownRemarkWordCountParagraphs = "hero___childMarkdownRemark___wordCount___paragraphs",
  HeroChildMarkdownRemarkWordCountSentences = "hero___childMarkdownRemark___wordCount___sentences",
  HeroChildMarkdownRemarkWordCountWords = "hero___childMarkdownRemark___wordCount___words",
  HeroChildMarkdownRemarkParentId = "hero___childMarkdownRemark___parent___id",
  HeroChildMarkdownRemarkParentChildren = "hero___childMarkdownRemark___parent___children",
  HeroChildMarkdownRemarkChildren = "hero___childMarkdownRemark___children",
  HeroChildMarkdownRemarkChildrenId = "hero___childMarkdownRemark___children___id",
  HeroChildMarkdownRemarkChildrenChildren = "hero___childMarkdownRemark___children___children",
  HeroChildMarkdownRemarkInternalContent = "hero___childMarkdownRemark___internal___content",
  HeroChildMarkdownRemarkInternalContentDigest = "hero___childMarkdownRemark___internal___contentDigest",
  HeroChildMarkdownRemarkInternalDescription = "hero___childMarkdownRemark___internal___description",
  HeroChildMarkdownRemarkInternalFieldOwners = "hero___childMarkdownRemark___internal___fieldOwners",
  HeroChildMarkdownRemarkInternalIgnoreType = "hero___childMarkdownRemark___internal___ignoreType",
  HeroChildMarkdownRemarkInternalMediaType = "hero___childMarkdownRemark___internal___mediaType",
  HeroChildMarkdownRemarkInternalOwner = "hero___childMarkdownRemark___internal___owner",
  HeroChildMarkdownRemarkInternalType = "hero___childMarkdownRemark___internal___type",
  HeroId = "hero___id",
  HeroParentId = "hero___parent___id",
  HeroParentParentId = "hero___parent___parent___id",
  HeroParentParentChildren = "hero___parent___parent___children",
  HeroParentChildren = "hero___parent___children",
  HeroParentChildrenId = "hero___parent___children___id",
  HeroParentChildrenChildren = "hero___parent___children___children",
  HeroParentInternalContent = "hero___parent___internal___content",
  HeroParentInternalContentDigest = "hero___parent___internal___contentDigest",
  HeroParentInternalDescription = "hero___parent___internal___description",
  HeroParentInternalFieldOwners = "hero___parent___internal___fieldOwners",
  HeroParentInternalIgnoreType = "hero___parent___internal___ignoreType",
  HeroParentInternalMediaType = "hero___parent___internal___mediaType",
  HeroParentInternalOwner = "hero___parent___internal___owner",
  HeroParentInternalType = "hero___parent___internal___type",
  HeroChildren = "hero___children",
  HeroChildrenId = "hero___children___id",
  HeroChildrenParentId = "hero___children___parent___id",
  HeroChildrenParentChildren = "hero___children___parent___children",
  HeroChildrenChildren = "hero___children___children",
  HeroChildrenChildrenId = "hero___children___children___id",
  HeroChildrenChildrenChildren = "hero___children___children___children",
  HeroChildrenInternalContent = "hero___children___internal___content",
  HeroChildrenInternalContentDigest = "hero___children___internal___contentDigest",
  HeroChildrenInternalDescription = "hero___children___internal___description",
  HeroChildrenInternalFieldOwners = "hero___children___internal___fieldOwners",
  HeroChildrenInternalIgnoreType = "hero___children___internal___ignoreType",
  HeroChildrenInternalMediaType = "hero___children___internal___mediaType",
  HeroChildrenInternalOwner = "hero___children___internal___owner",
  HeroChildrenInternalType = "hero___children___internal___type",
  HeroInternalContent = "hero___internal___content",
  HeroInternalContentDigest = "hero___internal___contentDigest",
  HeroInternalDescription = "hero___internal___description",
  HeroInternalFieldOwners = "hero___internal___fieldOwners",
  HeroInternalIgnoreType = "hero___internal___ignoreType",
  HeroInternalMediaType = "hero___internal___mediaType",
  HeroInternalOwner = "hero___internal___owner",
  HeroInternalType = "hero___internal___type",
  FrontmatterTitle = "frontmatter___title",
  FrontmatterLang = "frontmatter___lang",
  FrontmatterAuthor = "frontmatter___author",
  FrontmatterDate = "frontmatter___date",
  FrontmatterType = "frontmatter___type",
  FrontmatterExcerpt = "frontmatter___excerpt",
  FrontmatterHero = "frontmatter___hero",
  FrontmatterCategories = "frontmatter___categories",
  Excerpt = "excerpt",
  RawMarkdownBody = "rawMarkdownBody",
  FileAbsolutePath = "fileAbsolutePath",
  FieldsSlug = "fields___slug",
  Html = "html",
  HtmlAst = "htmlAst",
  ExcerptAst = "excerptAst",
  Headings = "headings",
  HeadingsId = "headings___id",
  HeadingsValue = "headings___value",
  HeadingsDepth = "headings___depth",
  TimeToRead = "timeToRead",
  TableOfContents = "tableOfContents",
  WordCountParagraphs = "wordCount___paragraphs",
  WordCountSentences = "wordCount___sentences",
  WordCountWords = "wordCount___words",
  ParentId = "parent___id",
  ParentParentId = "parent___parent___id",
  ParentParentParentId = "parent___parent___parent___id",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentChildren = "parent___children",
  ParentChildrenId = "parent___children___id",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  Children = "children",
  ChildrenId = "children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentParentId = "children___parent___parent___id",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenChildren = "children___children",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
}

export type MarkdownRemarkFieldsFilterInput = {
  readonly slug: Maybe<StringQueryOperatorInput>;
};

export type MarkdownRemarkFilterInput = {
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly hero: Maybe<FileFilterInput>;
  readonly frontmatter: Maybe<MarkdownRemarkFrontmatterFilterInput>;
  readonly excerpt: Maybe<StringQueryOperatorInput>;
  readonly rawMarkdownBody: Maybe<StringQueryOperatorInput>;
  readonly fileAbsolutePath: Maybe<StringQueryOperatorInput>;
  readonly fields: Maybe<MarkdownRemarkFieldsFilterInput>;
  readonly html: Maybe<StringQueryOperatorInput>;
  readonly htmlAst: Maybe<JsonQueryOperatorInput>;
  readonly excerptAst: Maybe<JsonQueryOperatorInput>;
  readonly headings: Maybe<MarkdownHeadingFilterListInput>;
  readonly timeToRead: Maybe<IntQueryOperatorInput>;
  readonly tableOfContents: Maybe<StringQueryOperatorInput>;
  readonly wordCount: Maybe<MarkdownWordCountFilterInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly internal: Maybe<InternalFilterInput>;
};

export type MarkdownRemarkFilterListInput = {
  readonly elemMatch: Maybe<MarkdownRemarkFilterInput>;
};

export type MarkdownRemarkFrontmatter = {
  readonly __typename?: "MarkdownRemarkFrontmatter";
  readonly title: Maybe<Scalars["String"]>;
  readonly lang: Maybe<Scalars["String"]>;
  readonly author: Maybe<Scalars["String"]>;
  readonly date: Maybe<Scalars["Date"]>;
  readonly type: Maybe<Scalars["String"]>;
  readonly excerpt: Maybe<Scalars["String"]>;
  readonly hero: Maybe<Scalars["String"]>;
  readonly categories: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
};

export type MarkdownRemarkFrontmatterDateArgs = {
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  difference: Maybe<Scalars["String"]>;
  locale: Maybe<Scalars["String"]>;
};

export type MarkdownRemarkFrontmatterFilterInput = {
  readonly title: Maybe<StringQueryOperatorInput>;
  readonly lang: Maybe<StringQueryOperatorInput>;
  readonly author: Maybe<StringQueryOperatorInput>;
  readonly date: Maybe<DateQueryOperatorInput>;
  readonly type: Maybe<StringQueryOperatorInput>;
  readonly excerpt: Maybe<StringQueryOperatorInput>;
  readonly hero: Maybe<StringQueryOperatorInput>;
  readonly categories: Maybe<StringQueryOperatorInput>;
};

export type MarkdownRemarkGroupConnection = {
  readonly __typename?: "MarkdownRemarkGroupConnection";
  readonly totalCount: Scalars["Int"];
  readonly edges: ReadonlyArray<MarkdownRemarkEdge>;
  readonly nodes: ReadonlyArray<MarkdownRemark>;
  readonly pageInfo: PageInfo;
  readonly field: Scalars["String"];
  readonly fieldValue: Maybe<Scalars["String"]>;
};

export type MarkdownRemarkSortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<MarkdownRemarkFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};

export type MarkdownWordCount = {
  readonly __typename?: "MarkdownWordCount";
  readonly paragraphs: Maybe<Scalars["Int"]>;
  readonly sentences: Maybe<Scalars["Int"]>;
  readonly words: Maybe<Scalars["Int"]>;
};

export type MarkdownWordCountFilterInput = {
  readonly paragraphs: Maybe<IntQueryOperatorInput>;
  readonly sentences: Maybe<IntQueryOperatorInput>;
  readonly words: Maybe<IntQueryOperatorInput>;
};

/** Node Interface */
export type Node = {
  readonly id: Scalars["ID"];
  readonly parent: Maybe<Node>;
  readonly children: ReadonlyArray<Node>;
  readonly internal: Internal;
};

export type NodeFilterInput = {
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly internal: Maybe<InternalFilterInput>;
};

export type NodeFilterListInput = {
  readonly elemMatch: Maybe<NodeFilterInput>;
};

export type PngOptions = {
  readonly quality: Maybe<Scalars["Int"]>;
  readonly compressionSpeed: Maybe<Scalars["Int"]>;
};

export type PageInfo = {
  readonly __typename?: "PageInfo";
  readonly currentPage: Scalars["Int"];
  readonly hasPreviousPage: Scalars["Boolean"];
  readonly hasNextPage: Scalars["Boolean"];
  readonly itemCount: Scalars["Int"];
  readonly pageCount: Scalars["Int"];
  readonly perPage: Maybe<Scalars["Int"]>;
  readonly totalCount: Scalars["Int"];
};

export type Potrace = {
  readonly turnPolicy: Maybe<PotraceTurnPolicy>;
  readonly turdSize: Maybe<Scalars["Float"]>;
  readonly alphaMax: Maybe<Scalars["Float"]>;
  readonly optCurve: Maybe<Scalars["Boolean"]>;
  readonly optTolerance: Maybe<Scalars["Float"]>;
  readonly threshold: Maybe<Scalars["Int"]>;
  readonly blackOnWhite: Maybe<Scalars["Boolean"]>;
  readonly color: Maybe<Scalars["String"]>;
  readonly background: Maybe<Scalars["String"]>;
};

export enum PotraceTurnPolicy {
  TurnpolicyBlack = "TURNPOLICY_BLACK",
  TurnpolicyWhite = "TURNPOLICY_WHITE",
  TurnpolicyLeft = "TURNPOLICY_LEFT",
  TurnpolicyRight = "TURNPOLICY_RIGHT",
  TurnpolicyMinority = "TURNPOLICY_MINORITY",
  TurnpolicyMajority = "TURNPOLICY_MAJORITY",
}

export type Query = {
  readonly __typename?: "Query";
  readonly file: Maybe<File>;
  readonly allFile: FileConnection;
  readonly directory: Maybe<Directory>;
  readonly allDirectory: DirectoryConnection;
  readonly site: Maybe<Site>;
  readonly allSite: SiteConnection;
  readonly sitePage: Maybe<SitePage>;
  readonly allSitePage: SitePageConnection;
  readonly imageSharp: Maybe<ImageSharp>;
  readonly allImageSharp: ImageSharpConnection;
  readonly markdownRemark: Maybe<MarkdownRemark>;
  readonly allMarkdownRemark: MarkdownRemarkConnection;
  readonly siteBuildMetadata: Maybe<SiteBuildMetadata>;
  readonly allSiteBuildMetadata: SiteBuildMetadataConnection;
  readonly sitePlugin: Maybe<SitePlugin>;
  readonly allSitePlugin: SitePluginConnection;
};

export type QueryFileArgs = {
  sourceInstanceName: Maybe<StringQueryOperatorInput>;
  absolutePath: Maybe<StringQueryOperatorInput>;
  relativePath: Maybe<StringQueryOperatorInput>;
  extension: Maybe<StringQueryOperatorInput>;
  size: Maybe<IntQueryOperatorInput>;
  prettySize: Maybe<StringQueryOperatorInput>;
  modifiedTime: Maybe<DateQueryOperatorInput>;
  accessTime: Maybe<DateQueryOperatorInput>;
  changeTime: Maybe<DateQueryOperatorInput>;
  birthTime: Maybe<DateQueryOperatorInput>;
  root: Maybe<StringQueryOperatorInput>;
  dir: Maybe<StringQueryOperatorInput>;
  base: Maybe<StringQueryOperatorInput>;
  ext: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  relativeDirectory: Maybe<StringQueryOperatorInput>;
  dev: Maybe<IntQueryOperatorInput>;
  mode: Maybe<IntQueryOperatorInput>;
  nlink: Maybe<IntQueryOperatorInput>;
  uid: Maybe<IntQueryOperatorInput>;
  gid: Maybe<IntQueryOperatorInput>;
  rdev: Maybe<IntQueryOperatorInput>;
  ino: Maybe<FloatQueryOperatorInput>;
  atimeMs: Maybe<FloatQueryOperatorInput>;
  mtimeMs: Maybe<FloatQueryOperatorInput>;
  ctimeMs: Maybe<FloatQueryOperatorInput>;
  atime: Maybe<DateQueryOperatorInput>;
  mtime: Maybe<DateQueryOperatorInput>;
  ctime: Maybe<DateQueryOperatorInput>;
  birthtime: Maybe<DateQueryOperatorInput>;
  birthtimeMs: Maybe<FloatQueryOperatorInput>;
  blksize: Maybe<IntQueryOperatorInput>;
  blocks: Maybe<IntQueryOperatorInput>;
  url: Maybe<StringQueryOperatorInput>;
  publicURL: Maybe<StringQueryOperatorInput>;
  childrenImageSharp: Maybe<ImageSharpFilterListInput>;
  childImageSharp: Maybe<ImageSharpFilterInput>;
  childrenMarkdownRemark: Maybe<MarkdownRemarkFilterListInput>;
  childMarkdownRemark: Maybe<MarkdownRemarkFilterInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};

export type QueryAllFileArgs = {
  filter: Maybe<FileFilterInput>;
  sort: Maybe<FileSortInput>;
  skip: Maybe<Scalars["Int"]>;
  limit: Maybe<Scalars["Int"]>;
};

export type QueryDirectoryArgs = {
  sourceInstanceName: Maybe<StringQueryOperatorInput>;
  absolutePath: Maybe<StringQueryOperatorInput>;
  relativePath: Maybe<StringQueryOperatorInput>;
  extension: Maybe<StringQueryOperatorInput>;
  size: Maybe<IntQueryOperatorInput>;
  prettySize: Maybe<StringQueryOperatorInput>;
  modifiedTime: Maybe<DateQueryOperatorInput>;
  accessTime: Maybe<DateQueryOperatorInput>;
  changeTime: Maybe<DateQueryOperatorInput>;
  birthTime: Maybe<DateQueryOperatorInput>;
  root: Maybe<StringQueryOperatorInput>;
  dir: Maybe<StringQueryOperatorInput>;
  base: Maybe<StringQueryOperatorInput>;
  ext: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  relativeDirectory: Maybe<StringQueryOperatorInput>;
  dev: Maybe<IntQueryOperatorInput>;
  mode: Maybe<IntQueryOperatorInput>;
  nlink: Maybe<IntQueryOperatorInput>;
  uid: Maybe<IntQueryOperatorInput>;
  gid: Maybe<IntQueryOperatorInput>;
  rdev: Maybe<IntQueryOperatorInput>;
  ino: Maybe<FloatQueryOperatorInput>;
  atimeMs: Maybe<FloatQueryOperatorInput>;
  mtimeMs: Maybe<FloatQueryOperatorInput>;
  ctimeMs: Maybe<FloatQueryOperatorInput>;
  atime: Maybe<DateQueryOperatorInput>;
  mtime: Maybe<DateQueryOperatorInput>;
  ctime: Maybe<DateQueryOperatorInput>;
  birthtime: Maybe<DateQueryOperatorInput>;
  birthtimeMs: Maybe<FloatQueryOperatorInput>;
  blksize: Maybe<IntQueryOperatorInput>;
  blocks: Maybe<IntQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};

export type QueryAllDirectoryArgs = {
  filter: Maybe<DirectoryFilterInput>;
  sort: Maybe<DirectorySortInput>;
  skip: Maybe<Scalars["Int"]>;
  limit: Maybe<Scalars["Int"]>;
};

export type QuerySiteArgs = {
  buildTime: Maybe<DateQueryOperatorInput>;
  siteMetadata: Maybe<SiteSiteMetadataFilterInput>;
  port: Maybe<IntQueryOperatorInput>;
  host: Maybe<StringQueryOperatorInput>;
  flags: Maybe<SiteFlagsFilterInput>;
  polyfill: Maybe<BooleanQueryOperatorInput>;
  pathPrefix: Maybe<StringQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};

export type QueryAllSiteArgs = {
  filter: Maybe<SiteFilterInput>;
  sort: Maybe<SiteSortInput>;
  skip: Maybe<Scalars["Int"]>;
  limit: Maybe<Scalars["Int"]>;
};

export type QuerySitePageArgs = {
  path: Maybe<StringQueryOperatorInput>;
  component: Maybe<StringQueryOperatorInput>;
  internalComponentName: Maybe<StringQueryOperatorInput>;
  componentChunkName: Maybe<StringQueryOperatorInput>;
  matchPath: Maybe<StringQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};

export type QueryAllSitePageArgs = {
  filter: Maybe<SitePageFilterInput>;
  sort: Maybe<SitePageSortInput>;
  skip: Maybe<Scalars["Int"]>;
  limit: Maybe<Scalars["Int"]>;
};

export type QueryImageSharpArgs = {
  fixed: Maybe<ImageSharpFixedFilterInput>;
  fluid: Maybe<ImageSharpFluidFilterInput>;
  gatsbyImageData: Maybe<JsonQueryOperatorInput>;
  original: Maybe<ImageSharpOriginalFilterInput>;
  resize: Maybe<ImageSharpResizeFilterInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};

export type QueryAllImageSharpArgs = {
  filter: Maybe<ImageSharpFilterInput>;
  sort: Maybe<ImageSharpSortInput>;
  skip: Maybe<Scalars["Int"]>;
  limit: Maybe<Scalars["Int"]>;
};

export type QueryMarkdownRemarkArgs = {
  id: Maybe<StringQueryOperatorInput>;
  hero: Maybe<FileFilterInput>;
  frontmatter: Maybe<MarkdownRemarkFrontmatterFilterInput>;
  excerpt: Maybe<StringQueryOperatorInput>;
  rawMarkdownBody: Maybe<StringQueryOperatorInput>;
  fileAbsolutePath: Maybe<StringQueryOperatorInput>;
  fields: Maybe<MarkdownRemarkFieldsFilterInput>;
  html: Maybe<StringQueryOperatorInput>;
  htmlAst: Maybe<JsonQueryOperatorInput>;
  excerptAst: Maybe<JsonQueryOperatorInput>;
  headings: Maybe<MarkdownHeadingFilterListInput>;
  timeToRead: Maybe<IntQueryOperatorInput>;
  tableOfContents: Maybe<StringQueryOperatorInput>;
  wordCount: Maybe<MarkdownWordCountFilterInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};

export type QueryAllMarkdownRemarkArgs = {
  filter: Maybe<MarkdownRemarkFilterInput>;
  sort: Maybe<MarkdownRemarkSortInput>;
  skip: Maybe<Scalars["Int"]>;
  limit: Maybe<Scalars["Int"]>;
};

export type QuerySiteBuildMetadataArgs = {
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  buildTime: Maybe<DateQueryOperatorInput>;
};

export type QueryAllSiteBuildMetadataArgs = {
  filter: Maybe<SiteBuildMetadataFilterInput>;
  sort: Maybe<SiteBuildMetadataSortInput>;
  skip: Maybe<Scalars["Int"]>;
  limit: Maybe<Scalars["Int"]>;
};

export type QuerySitePluginArgs = {
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  resolve: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  version: Maybe<StringQueryOperatorInput>;
  pluginOptions: Maybe<SitePluginPluginOptionsFilterInput>;
  nodeAPIs: Maybe<StringQueryOperatorInput>;
  browserAPIs: Maybe<StringQueryOperatorInput>;
  ssrAPIs: Maybe<StringQueryOperatorInput>;
  pluginFilepath: Maybe<StringQueryOperatorInput>;
  packageJson: Maybe<SitePluginPackageJsonFilterInput>;
};

export type QueryAllSitePluginArgs = {
  filter: Maybe<SitePluginFilterInput>;
  sort: Maybe<SitePluginSortInput>;
  skip: Maybe<Scalars["Int"]>;
  limit: Maybe<Scalars["Int"]>;
};

export type Site = Node & {
  readonly __typename?: "Site";
  readonly buildTime: Maybe<Scalars["Date"]>;
  readonly siteMetadata: Maybe<SiteSiteMetadata>;
  readonly port: Maybe<Scalars["Int"]>;
  readonly host: Maybe<Scalars["String"]>;
  readonly flags: Maybe<SiteFlags>;
  readonly polyfill: Maybe<Scalars["Boolean"]>;
  readonly pathPrefix: Maybe<Scalars["String"]>;
  readonly id: Scalars["ID"];
  readonly parent: Maybe<Node>;
  readonly children: ReadonlyArray<Node>;
  readonly internal: Internal;
};

export type SiteBuildTimeArgs = {
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  difference: Maybe<Scalars["String"]>;
  locale: Maybe<Scalars["String"]>;
};

export type SiteBuildMetadata = Node & {
  readonly __typename?: "SiteBuildMetadata";
  readonly id: Scalars["ID"];
  readonly parent: Maybe<Node>;
  readonly children: ReadonlyArray<Node>;
  readonly internal: Internal;
  readonly buildTime: Maybe<Scalars["Date"]>;
};

export type SiteBuildMetadataBuildTimeArgs = {
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  difference: Maybe<Scalars["String"]>;
  locale: Maybe<Scalars["String"]>;
};

export type SiteBuildMetadataConnection = {
  readonly __typename?: "SiteBuildMetadataConnection";
  readonly totalCount: Scalars["Int"];
  readonly edges: ReadonlyArray<SiteBuildMetadataEdge>;
  readonly nodes: ReadonlyArray<SiteBuildMetadata>;
  readonly pageInfo: PageInfo;
  readonly distinct: ReadonlyArray<Scalars["String"]>;
  readonly group: ReadonlyArray<SiteBuildMetadataGroupConnection>;
};

export type SiteBuildMetadataConnectionDistinctArgs = {
  field: SiteBuildMetadataFieldsEnum;
};

export type SiteBuildMetadataConnectionGroupArgs = {
  skip: Maybe<Scalars["Int"]>;
  limit: Maybe<Scalars["Int"]>;
  field: SiteBuildMetadataFieldsEnum;
};

export type SiteBuildMetadataEdge = {
  readonly __typename?: "SiteBuildMetadataEdge";
  readonly next: Maybe<SiteBuildMetadata>;
  readonly node: SiteBuildMetadata;
  readonly previous: Maybe<SiteBuildMetadata>;
};

export enum SiteBuildMetadataFieldsEnum {
  Id = "id",
  ParentId = "parent___id",
  ParentParentId = "parent___parent___id",
  ParentParentParentId = "parent___parent___parent___id",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentChildren = "parent___children",
  ParentChildrenId = "parent___children___id",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  Children = "children",
  ChildrenId = "children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentParentId = "children___parent___parent___id",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenChildren = "children___children",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
  BuildTime = "buildTime",
}

export type SiteBuildMetadataFilterInput = {
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly internal: Maybe<InternalFilterInput>;
  readonly buildTime: Maybe<DateQueryOperatorInput>;
};

export type SiteBuildMetadataGroupConnection = {
  readonly __typename?: "SiteBuildMetadataGroupConnection";
  readonly totalCount: Scalars["Int"];
  readonly edges: ReadonlyArray<SiteBuildMetadataEdge>;
  readonly nodes: ReadonlyArray<SiteBuildMetadata>;
  readonly pageInfo: PageInfo;
  readonly field: Scalars["String"];
  readonly fieldValue: Maybe<Scalars["String"]>;
};

export type SiteBuildMetadataSortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<SiteBuildMetadataFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};

export type SiteConnection = {
  readonly __typename?: "SiteConnection";
  readonly totalCount: Scalars["Int"];
  readonly edges: ReadonlyArray<SiteEdge>;
  readonly nodes: ReadonlyArray<Site>;
  readonly pageInfo: PageInfo;
  readonly distinct: ReadonlyArray<Scalars["String"]>;
  readonly group: ReadonlyArray<SiteGroupConnection>;
};

export type SiteConnectionDistinctArgs = {
  field: SiteFieldsEnum;
};

export type SiteConnectionGroupArgs = {
  skip: Maybe<Scalars["Int"]>;
  limit: Maybe<Scalars["Int"]>;
  field: SiteFieldsEnum;
};

export type SiteEdge = {
  readonly __typename?: "SiteEdge";
  readonly next: Maybe<Site>;
  readonly node: Site;
  readonly previous: Maybe<Site>;
};

export enum SiteFieldsEnum {
  BuildTime = "buildTime",
  SiteMetadataTitle = "siteMetadata___title",
  SiteMetadataDescription = "siteMetadata___description",
  SiteMetadataLanguage = "siteMetadata___language",
  SiteMetadataAuthorName = "siteMetadata___author___name",
  SiteMetadataSiteUrl = "siteMetadata___siteUrl",
  SiteMetadataDisqus = "siteMetadata___disqus",
  SiteMetadataSocial = "siteMetadata___social",
  SiteMetadataSocialName = "siteMetadata___social___name",
  SiteMetadataSocialUrl = "siteMetadata___social___url",
  SiteMetadataRepository = "siteMetadata___repository",
  SiteMetadataRss = "siteMetadata___rss",
  Port = "port",
  Host = "host",
  FlagsFastDev = "flags___FAST_DEV",
  Polyfill = "polyfill",
  PathPrefix = "pathPrefix",
  Id = "id",
  ParentId = "parent___id",
  ParentParentId = "parent___parent___id",
  ParentParentParentId = "parent___parent___parent___id",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentChildren = "parent___children",
  ParentChildrenId = "parent___children___id",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  Children = "children",
  ChildrenId = "children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentParentId = "children___parent___parent___id",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenChildren = "children___children",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
}

export type SiteFilterInput = {
  readonly buildTime: Maybe<DateQueryOperatorInput>;
  readonly siteMetadata: Maybe<SiteSiteMetadataFilterInput>;
  readonly port: Maybe<IntQueryOperatorInput>;
  readonly host: Maybe<StringQueryOperatorInput>;
  readonly flags: Maybe<SiteFlagsFilterInput>;
  readonly polyfill: Maybe<BooleanQueryOperatorInput>;
  readonly pathPrefix: Maybe<StringQueryOperatorInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly internal: Maybe<InternalFilterInput>;
};

export type SiteFlags = {
  readonly __typename?: "SiteFlags";
  readonly FAST_DEV: Maybe<Scalars["Boolean"]>;
};

export type SiteFlagsFilterInput = {
  readonly FAST_DEV: Maybe<BooleanQueryOperatorInput>;
};

export type SiteGroupConnection = {
  readonly __typename?: "SiteGroupConnection";
  readonly totalCount: Scalars["Int"];
  readonly edges: ReadonlyArray<SiteEdge>;
  readonly nodes: ReadonlyArray<Site>;
  readonly pageInfo: PageInfo;
  readonly field: Scalars["String"];
  readonly fieldValue: Maybe<Scalars["String"]>;
};

export type SitePage = Node & {
  readonly __typename?: "SitePage";
  readonly path: Scalars["String"];
  readonly component: Scalars["String"];
  readonly internalComponentName: Scalars["String"];
  readonly componentChunkName: Scalars["String"];
  readonly matchPath: Maybe<Scalars["String"]>;
  readonly id: Scalars["ID"];
  readonly parent: Maybe<Node>;
  readonly children: ReadonlyArray<Node>;
  readonly internal: Internal;
};

export type SitePageConnection = {
  readonly __typename?: "SitePageConnection";
  readonly totalCount: Scalars["Int"];
  readonly edges: ReadonlyArray<SitePageEdge>;
  readonly nodes: ReadonlyArray<SitePage>;
  readonly pageInfo: PageInfo;
  readonly distinct: ReadonlyArray<Scalars["String"]>;
  readonly group: ReadonlyArray<SitePageGroupConnection>;
};

export type SitePageConnectionDistinctArgs = {
  field: SitePageFieldsEnum;
};

export type SitePageConnectionGroupArgs = {
  skip: Maybe<Scalars["Int"]>;
  limit: Maybe<Scalars["Int"]>;
  field: SitePageFieldsEnum;
};

export type SitePageEdge = {
  readonly __typename?: "SitePageEdge";
  readonly next: Maybe<SitePage>;
  readonly node: SitePage;
  readonly previous: Maybe<SitePage>;
};

export enum SitePageFieldsEnum {
  Path = "path",
  Component = "component",
  InternalComponentName = "internalComponentName",
  ComponentChunkName = "componentChunkName",
  MatchPath = "matchPath",
  Id = "id",
  ParentId = "parent___id",
  ParentParentId = "parent___parent___id",
  ParentParentParentId = "parent___parent___parent___id",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentChildren = "parent___children",
  ParentChildrenId = "parent___children___id",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  Children = "children",
  ChildrenId = "children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentParentId = "children___parent___parent___id",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenChildren = "children___children",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
}

export type SitePageFilterInput = {
  readonly path: Maybe<StringQueryOperatorInput>;
  readonly component: Maybe<StringQueryOperatorInput>;
  readonly internalComponentName: Maybe<StringQueryOperatorInput>;
  readonly componentChunkName: Maybe<StringQueryOperatorInput>;
  readonly matchPath: Maybe<StringQueryOperatorInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly internal: Maybe<InternalFilterInput>;
};

export type SitePageGroupConnection = {
  readonly __typename?: "SitePageGroupConnection";
  readonly totalCount: Scalars["Int"];
  readonly edges: ReadonlyArray<SitePageEdge>;
  readonly nodes: ReadonlyArray<SitePage>;
  readonly pageInfo: PageInfo;
  readonly field: Scalars["String"];
  readonly fieldValue: Maybe<Scalars["String"]>;
};

export type SitePageSortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<SitePageFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};

export type SitePlugin = Node & {
  readonly __typename?: "SitePlugin";
  readonly id: Scalars["ID"];
  readonly parent: Maybe<Node>;
  readonly children: ReadonlyArray<Node>;
  readonly internal: Internal;
  readonly resolve: Maybe<Scalars["String"]>;
  readonly name: Maybe<Scalars["String"]>;
  readonly version: Maybe<Scalars["String"]>;
  readonly pluginOptions: Maybe<SitePluginPluginOptions>;
  readonly nodeAPIs: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
  readonly browserAPIs: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
  readonly ssrAPIs: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
  readonly pluginFilepath: Maybe<Scalars["String"]>;
  readonly packageJson: Maybe<SitePluginPackageJson>;
};

export type SitePluginConnection = {
  readonly __typename?: "SitePluginConnection";
  readonly totalCount: Scalars["Int"];
  readonly edges: ReadonlyArray<SitePluginEdge>;
  readonly nodes: ReadonlyArray<SitePlugin>;
  readonly pageInfo: PageInfo;
  readonly distinct: ReadonlyArray<Scalars["String"]>;
  readonly group: ReadonlyArray<SitePluginGroupConnection>;
};

export type SitePluginConnectionDistinctArgs = {
  field: SitePluginFieldsEnum;
};

export type SitePluginConnectionGroupArgs = {
  skip: Maybe<Scalars["Int"]>;
  limit: Maybe<Scalars["Int"]>;
  field: SitePluginFieldsEnum;
};

export type SitePluginEdge = {
  readonly __typename?: "SitePluginEdge";
  readonly next: Maybe<SitePlugin>;
  readonly node: SitePlugin;
  readonly previous: Maybe<SitePlugin>;
};

export enum SitePluginFieldsEnum {
  Id = "id",
  ParentId = "parent___id",
  ParentParentId = "parent___parent___id",
  ParentParentParentId = "parent___parent___parent___id",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentChildren = "parent___children",
  ParentChildrenId = "parent___children___id",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  Children = "children",
  ChildrenId = "children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentParentId = "children___parent___parent___id",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenChildren = "children___children",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
  Resolve = "resolve",
  Name = "name",
  Version = "version",
  PluginOptionsPlugins = "pluginOptions___plugins",
  PluginOptionsPluginsResolve = "pluginOptions___plugins___resolve",
  PluginOptionsPluginsId = "pluginOptions___plugins___id",
  PluginOptionsPluginsName = "pluginOptions___plugins___name",
  PluginOptionsPluginsVersion = "pluginOptions___plugins___version",
  PluginOptionsPluginsPluginOptionsMaxWidth = "pluginOptions___plugins___pluginOptions___maxWidth",
  PluginOptionsPluginsPluginOptionsLinkImagesToOriginal = "pluginOptions___plugins___pluginOptions___linkImagesToOriginal",
  PluginOptionsPluginsPluginOptionsShowCaptions = "pluginOptions___plugins___pluginOptions___showCaptions",
  PluginOptionsPluginsPluginOptionsMarkdownCaptions = "pluginOptions___plugins___pluginOptions___markdownCaptions",
  PluginOptionsPluginsPluginOptionsSizeByPixelDensity = "pluginOptions___plugins___pluginOptions___sizeByPixelDensity",
  PluginOptionsPluginsPluginOptionsBackgroundColor = "pluginOptions___plugins___pluginOptions___backgroundColor",
  PluginOptionsPluginsPluginOptionsQuality = "pluginOptions___plugins___pluginOptions___quality",
  PluginOptionsPluginsPluginOptionsWithWebp = "pluginOptions___plugins___pluginOptions___withWebp",
  PluginOptionsPluginsPluginOptionsTracedSvg = "pluginOptions___plugins___pluginOptions___tracedSVG",
  PluginOptionsPluginsPluginOptionsLoading = "pluginOptions___plugins___pluginOptions___loading",
  PluginOptionsPluginsPluginOptionsDisableBgImageOnAlpha = "pluginOptions___plugins___pluginOptions___disableBgImageOnAlpha",
  PluginOptionsPluginsPluginOptionsDisableBgImage = "pluginOptions___plugins___pluginOptions___disableBgImage",
  PluginOptionsPluginsPluginOptionsWrapperStyle = "pluginOptions___plugins___pluginOptions___wrapperStyle",
  PluginOptionsPluginsPluginOptionsIcon = "pluginOptions___plugins___pluginOptions___icon",
  PluginOptionsPluginsPluginOptionsOffsetY = "pluginOptions___plugins___pluginOptions___offsetY",
  PluginOptionsPluginsPluginOptionsClassName = "pluginOptions___plugins___pluginOptions___className",
  PluginOptionsPluginsNodeApIs = "pluginOptions___plugins___nodeAPIs",
  PluginOptionsPluginsBrowserApIs = "pluginOptions___plugins___browserAPIs",
  PluginOptionsPluginsSsrApIs = "pluginOptions___plugins___ssrAPIs",
  PluginOptionsPluginsPluginFilepath = "pluginOptions___plugins___pluginFilepath",
  PluginOptionsBase64Width = "pluginOptions___base64Width",
  PluginOptionsStripMetadata = "pluginOptions___stripMetadata",
  PluginOptionsDefaultQuality = "pluginOptions___defaultQuality",
  PluginOptionsFailOnError = "pluginOptions___failOnError",
  PluginOptionsMaxWidth = "pluginOptions___maxWidth",
  PluginOptionsLinkImagesToOriginal = "pluginOptions___linkImagesToOriginal",
  PluginOptionsShowCaptions = "pluginOptions___showCaptions",
  PluginOptionsMarkdownCaptions = "pluginOptions___markdownCaptions",
  PluginOptionsSizeByPixelDensity = "pluginOptions___sizeByPixelDensity",
  PluginOptionsBackgroundColor = "pluginOptions___backgroundColor",
  PluginOptionsQuality = "pluginOptions___quality",
  PluginOptionsWithWebp = "pluginOptions___withWebp",
  PluginOptionsTracedSvg = "pluginOptions___tracedSVG",
  PluginOptionsLoading = "pluginOptions___loading",
  PluginOptionsDisableBgImageOnAlpha = "pluginOptions___disableBgImageOnAlpha",
  PluginOptionsDisableBgImage = "pluginOptions___disableBgImage",
  PluginOptionsWrapperStyle = "pluginOptions___wrapperStyle",
  PluginOptionsOffsetY = "pluginOptions___offsetY",
  PluginOptionsClassName = "pluginOptions___className",
  PluginOptionsPath = "pluginOptions___path",
  PluginOptionsName = "pluginOptions___name",
  PluginOptionsQuery = "pluginOptions___query",
  PluginOptionsFeeds = "pluginOptions___feeds",
  PluginOptionsFeedsQuery = "pluginOptions___feeds___query",
  PluginOptionsFeedsOutput = "pluginOptions___feeds___output",
  PluginOptionsFeedsTitle = "pluginOptions___feeds___title",
  PluginOptionsFeedsMatch = "pluginOptions___feeds___match",
  PluginOptionsShortName = "pluginOptions___short_name",
  PluginOptionsStartUrl = "pluginOptions___start_url",
  PluginOptionsThemeColor = "pluginOptions___theme_color",
  PluginOptionsDisplay = "pluginOptions___display",
  PluginOptionsCrossOrigin = "pluginOptions___crossOrigin",
  PluginOptionsLegacy = "pluginOptions___legacy",
  PluginOptionsThemeColorInHead = "pluginOptions___theme_color_in_head",
  PluginOptionsCacheBustingMode = "pluginOptions___cache_busting_mode",
  PluginOptionsIncludeFavicon = "pluginOptions___include_favicon",
  PluginOptionsCacheDigest = "pluginOptions___cacheDigest",
  PluginOptionsPolicy = "pluginOptions___policy",
  PluginOptionsPolicyUserAgent = "pluginOptions___policy___userAgent",
  PluginOptionsPolicyAllow = "pluginOptions___policy___allow",
  PluginOptionsOutput = "pluginOptions___output",
  PluginOptionsIsTsx = "pluginOptions___isTSX",
  PluginOptionsAllExtensions = "pluginOptions___allExtensions",
  PluginOptionsJsxPragma = "pluginOptions___jsxPragma",
  PluginOptionsSassOptionsIncludePaths = "pluginOptions___sassOptions___includePaths",
  PluginOptionsSassOptionsIndentedSyntax = "pluginOptions___sassOptions___indentedSyntax",
  PluginOptionsSassOptionsIndentType = "pluginOptions___sassOptions___indentType",
  PluginOptionsSassOptionsIndentWidth = "pluginOptions___sassOptions___indentWidth",
  PluginOptionsSassOptionsLinefeed = "pluginOptions___sassOptions___linefeed",
  PluginOptionsSassOptionsOmitSourceMapUrl = "pluginOptions___sassOptions___omitSourceMapUrl",
  PluginOptionsSassOptionsPrecision = "pluginOptions___sassOptions___precision",
  PluginOptionsSassOptionsSourceComments = "pluginOptions___sassOptions___sourceComments",
  PluginOptionsSassOptionsSourceMapContents = "pluginOptions___sassOptions___sourceMapContents",
  PluginOptionsSassOptionsSourceMapEmbed = "pluginOptions___sassOptions___sourceMapEmbed",
  PluginOptionsCreateLinkInHead = "pluginOptions___createLinkInHead",
  PluginOptionsPathCheck = "pluginOptions___pathCheck",
  NodeApIs = "nodeAPIs",
  BrowserApIs = "browserAPIs",
  SsrApIs = "ssrAPIs",
  PluginFilepath = "pluginFilepath",
  PackageJsonName = "packageJson___name",
  PackageJsonDescription = "packageJson___description",
  PackageJsonVersion = "packageJson___version",
  PackageJsonMain = "packageJson___main",
  PackageJsonAuthor = "packageJson___author",
  PackageJsonLicense = "packageJson___license",
  PackageJsonDependencies = "packageJson___dependencies",
  PackageJsonDependenciesName = "packageJson___dependencies___name",
  PackageJsonDependenciesVersion = "packageJson___dependencies___version",
  PackageJsonDevDependencies = "packageJson___devDependencies",
  PackageJsonDevDependenciesName = "packageJson___devDependencies___name",
  PackageJsonDevDependenciesVersion = "packageJson___devDependencies___version",
  PackageJsonPeerDependencies = "packageJson___peerDependencies",
  PackageJsonPeerDependenciesName = "packageJson___peerDependencies___name",
  PackageJsonPeerDependenciesVersion = "packageJson___peerDependencies___version",
  PackageJsonKeywords = "packageJson___keywords",
}

export type SitePluginFilterInput = {
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly internal: Maybe<InternalFilterInput>;
  readonly resolve: Maybe<StringQueryOperatorInput>;
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly version: Maybe<StringQueryOperatorInput>;
  readonly pluginOptions: Maybe<SitePluginPluginOptionsFilterInput>;
  readonly nodeAPIs: Maybe<StringQueryOperatorInput>;
  readonly browserAPIs: Maybe<StringQueryOperatorInput>;
  readonly ssrAPIs: Maybe<StringQueryOperatorInput>;
  readonly pluginFilepath: Maybe<StringQueryOperatorInput>;
  readonly packageJson: Maybe<SitePluginPackageJsonFilterInput>;
};

export type SitePluginGroupConnection = {
  readonly __typename?: "SitePluginGroupConnection";
  readonly totalCount: Scalars["Int"];
  readonly edges: ReadonlyArray<SitePluginEdge>;
  readonly nodes: ReadonlyArray<SitePlugin>;
  readonly pageInfo: PageInfo;
  readonly field: Scalars["String"];
  readonly fieldValue: Maybe<Scalars["String"]>;
};

export type SitePluginPackageJson = {
  readonly __typename?: "SitePluginPackageJson";
  readonly name: Maybe<Scalars["String"]>;
  readonly description: Maybe<Scalars["String"]>;
  readonly version: Maybe<Scalars["String"]>;
  readonly main: Maybe<Scalars["String"]>;
  readonly author: Maybe<Scalars["String"]>;
  readonly license: Maybe<Scalars["String"]>;
  readonly dependencies: Maybe<
    ReadonlyArray<Maybe<SitePluginPackageJsonDependencies>>
  >;
  readonly devDependencies: Maybe<
    ReadonlyArray<Maybe<SitePluginPackageJsonDevDependencies>>
  >;
  readonly peerDependencies: Maybe<
    ReadonlyArray<Maybe<SitePluginPackageJsonPeerDependencies>>
  >;
  readonly keywords: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
};

export type SitePluginPackageJsonDependencies = {
  readonly __typename?: "SitePluginPackageJsonDependencies";
  readonly name: Maybe<Scalars["String"]>;
  readonly version: Maybe<Scalars["String"]>;
};

export type SitePluginPackageJsonDependenciesFilterInput = {
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly version: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPackageJsonDependenciesFilterListInput = {
  readonly elemMatch: Maybe<SitePluginPackageJsonDependenciesFilterInput>;
};

export type SitePluginPackageJsonDevDependencies = {
  readonly __typename?: "SitePluginPackageJsonDevDependencies";
  readonly name: Maybe<Scalars["String"]>;
  readonly version: Maybe<Scalars["String"]>;
};

export type SitePluginPackageJsonDevDependenciesFilterInput = {
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly version: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPackageJsonDevDependenciesFilterListInput = {
  readonly elemMatch: Maybe<SitePluginPackageJsonDevDependenciesFilterInput>;
};

export type SitePluginPackageJsonFilterInput = {
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly description: Maybe<StringQueryOperatorInput>;
  readonly version: Maybe<StringQueryOperatorInput>;
  readonly main: Maybe<StringQueryOperatorInput>;
  readonly author: Maybe<StringQueryOperatorInput>;
  readonly license: Maybe<StringQueryOperatorInput>;
  readonly dependencies: Maybe<SitePluginPackageJsonDependenciesFilterListInput>;
  readonly devDependencies: Maybe<SitePluginPackageJsonDevDependenciesFilterListInput>;
  readonly peerDependencies: Maybe<SitePluginPackageJsonPeerDependenciesFilterListInput>;
  readonly keywords: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPackageJsonPeerDependencies = {
  readonly __typename?: "SitePluginPackageJsonPeerDependencies";
  readonly name: Maybe<Scalars["String"]>;
  readonly version: Maybe<Scalars["String"]>;
};

export type SitePluginPackageJsonPeerDependenciesFilterInput = {
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly version: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPackageJsonPeerDependenciesFilterListInput = {
  readonly elemMatch: Maybe<SitePluginPackageJsonPeerDependenciesFilterInput>;
};

export type SitePluginPluginOptions = {
  readonly __typename?: "SitePluginPluginOptions";
  readonly plugins: Maybe<ReadonlyArray<Maybe<SitePluginPluginOptionsPlugins>>>;
  readonly base64Width: Maybe<Scalars["Int"]>;
  readonly stripMetadata: Maybe<Scalars["Boolean"]>;
  readonly defaultQuality: Maybe<Scalars["Int"]>;
  readonly failOnError: Maybe<Scalars["Boolean"]>;
  readonly maxWidth: Maybe<Scalars["Int"]>;
  readonly linkImagesToOriginal: Maybe<Scalars["Boolean"]>;
  readonly showCaptions: Maybe<Scalars["Boolean"]>;
  readonly markdownCaptions: Maybe<Scalars["Boolean"]>;
  readonly sizeByPixelDensity: Maybe<Scalars["Boolean"]>;
  readonly backgroundColor: Maybe<Scalars["String"]>;
  readonly quality: Maybe<Scalars["Int"]>;
  readonly withWebp: Maybe<Scalars["Boolean"]>;
  readonly tracedSVG: Maybe<Scalars["Boolean"]>;
  readonly loading: Maybe<Scalars["String"]>;
  readonly disableBgImageOnAlpha: Maybe<Scalars["Boolean"]>;
  readonly disableBgImage: Maybe<Scalars["Boolean"]>;
  readonly wrapperStyle: Maybe<Scalars["String"]>;
  readonly offsetY: Maybe<Scalars["Int"]>;
  readonly className: Maybe<Scalars["String"]>;
  readonly path: Maybe<Scalars["String"]>;
  readonly name: Maybe<Scalars["String"]>;
  readonly query: Maybe<Scalars["String"]>;
  readonly feeds: Maybe<ReadonlyArray<Maybe<SitePluginPluginOptionsFeeds>>>;
  readonly short_name: Maybe<Scalars["String"]>;
  readonly start_url: Maybe<Scalars["String"]>;
  readonly background_color: Maybe<Scalars["String"]>;
  readonly theme_color: Maybe<Scalars["String"]>;
  readonly display: Maybe<Scalars["String"]>;
  readonly crossOrigin: Maybe<Scalars["String"]>;
  readonly legacy: Maybe<Scalars["Boolean"]>;
  readonly theme_color_in_head: Maybe<Scalars["Boolean"]>;
  readonly cache_busting_mode: Maybe<Scalars["String"]>;
  readonly include_favicon: Maybe<Scalars["Boolean"]>;
  readonly cacheDigest: Maybe<Scalars["String"]>;
  readonly policy: Maybe<ReadonlyArray<Maybe<SitePluginPluginOptionsPolicy>>>;
  readonly output: Maybe<Scalars["String"]>;
  readonly isTSX: Maybe<Scalars["Boolean"]>;
  readonly allExtensions: Maybe<Scalars["Boolean"]>;
  readonly jsxPragma: Maybe<Scalars["String"]>;
  readonly sassOptions: Maybe<SitePluginPluginOptionsSassOptions>;
  readonly createLinkInHead: Maybe<Scalars["Boolean"]>;
  readonly pathCheck: Maybe<Scalars["Boolean"]>;
};

export type SitePluginPluginOptionsFeeds = {
  readonly __typename?: "SitePluginPluginOptionsFeeds";
  readonly query: Maybe<Scalars["String"]>;
  readonly output: Maybe<Scalars["String"]>;
  readonly title: Maybe<Scalars["String"]>;
  readonly match: Maybe<Scalars["String"]>;
};

export type SitePluginPluginOptionsFeedsFilterInput = {
  readonly query: Maybe<StringQueryOperatorInput>;
  readonly output: Maybe<StringQueryOperatorInput>;
  readonly title: Maybe<StringQueryOperatorInput>;
  readonly match: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPluginOptionsFeedsFilterListInput = {
  readonly elemMatch: Maybe<SitePluginPluginOptionsFeedsFilterInput>;
};

export type SitePluginPluginOptionsFilterInput = {
  readonly plugins: Maybe<SitePluginPluginOptionsPluginsFilterListInput>;
  readonly base64Width: Maybe<IntQueryOperatorInput>;
  readonly stripMetadata: Maybe<BooleanQueryOperatorInput>;
  readonly defaultQuality: Maybe<IntQueryOperatorInput>;
  readonly failOnError: Maybe<BooleanQueryOperatorInput>;
  readonly maxWidth: Maybe<IntQueryOperatorInput>;
  readonly linkImagesToOriginal: Maybe<BooleanQueryOperatorInput>;
  readonly showCaptions: Maybe<BooleanQueryOperatorInput>;
  readonly markdownCaptions: Maybe<BooleanQueryOperatorInput>;
  readonly sizeByPixelDensity: Maybe<BooleanQueryOperatorInput>;
  readonly backgroundColor: Maybe<StringQueryOperatorInput>;
  readonly quality: Maybe<IntQueryOperatorInput>;
  readonly withWebp: Maybe<BooleanQueryOperatorInput>;
  readonly tracedSVG: Maybe<BooleanQueryOperatorInput>;
  readonly loading: Maybe<StringQueryOperatorInput>;
  readonly disableBgImageOnAlpha: Maybe<BooleanQueryOperatorInput>;
  readonly disableBgImage: Maybe<BooleanQueryOperatorInput>;
  readonly wrapperStyle: Maybe<StringQueryOperatorInput>;
  readonly offsetY: Maybe<IntQueryOperatorInput>;
  readonly className: Maybe<StringQueryOperatorInput>;
  readonly path: Maybe<StringQueryOperatorInput>;
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly query: Maybe<StringQueryOperatorInput>;
  readonly feeds: Maybe<SitePluginPluginOptionsFeedsFilterListInput>;
  readonly short_name: Maybe<StringQueryOperatorInput>;
  readonly start_url: Maybe<StringQueryOperatorInput>;
  readonly background_color: Maybe<StringQueryOperatorInput>;
  readonly theme_color: Maybe<StringQueryOperatorInput>;
  readonly display: Maybe<StringQueryOperatorInput>;
  readonly crossOrigin: Maybe<StringQueryOperatorInput>;
  readonly legacy: Maybe<BooleanQueryOperatorInput>;
  readonly theme_color_in_head: Maybe<BooleanQueryOperatorInput>;
  readonly cache_busting_mode: Maybe<StringQueryOperatorInput>;
  readonly include_favicon: Maybe<BooleanQueryOperatorInput>;
  readonly cacheDigest: Maybe<StringQueryOperatorInput>;
  readonly policy: Maybe<SitePluginPluginOptionsPolicyFilterListInput>;
  readonly output: Maybe<StringQueryOperatorInput>;
  readonly isTSX: Maybe<BooleanQueryOperatorInput>;
  readonly allExtensions: Maybe<BooleanQueryOperatorInput>;
  readonly jsxPragma: Maybe<StringQueryOperatorInput>;
  readonly sassOptions: Maybe<SitePluginPluginOptionsSassOptionsFilterInput>;
  readonly createLinkInHead: Maybe<BooleanQueryOperatorInput>;
  readonly pathCheck: Maybe<BooleanQueryOperatorInput>;
};

export type SitePluginPluginOptionsPlugins = {
  readonly __typename?: "SitePluginPluginOptionsPlugins";
  readonly resolve: Maybe<Scalars["String"]>;
  readonly id: Maybe<Scalars["String"]>;
  readonly name: Maybe<Scalars["String"]>;
  readonly version: Maybe<Scalars["String"]>;
  readonly pluginOptions: Maybe<SitePluginPluginOptionsPluginsPluginOptions>;
  readonly nodeAPIs: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
  readonly browserAPIs: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
  readonly ssrAPIs: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
  readonly pluginFilepath: Maybe<Scalars["String"]>;
};

export type SitePluginPluginOptionsPluginsFilterInput = {
  readonly resolve: Maybe<StringQueryOperatorInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly version: Maybe<StringQueryOperatorInput>;
  readonly pluginOptions: Maybe<SitePluginPluginOptionsPluginsPluginOptionsFilterInput>;
  readonly nodeAPIs: Maybe<StringQueryOperatorInput>;
  readonly browserAPIs: Maybe<StringQueryOperatorInput>;
  readonly ssrAPIs: Maybe<StringQueryOperatorInput>;
  readonly pluginFilepath: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPluginOptionsPluginsFilterListInput = {
  readonly elemMatch: Maybe<SitePluginPluginOptionsPluginsFilterInput>;
};

export type SitePluginPluginOptionsPluginsPluginOptions = {
  readonly __typename?: "SitePluginPluginOptionsPluginsPluginOptions";
  readonly maxWidth: Maybe<Scalars["Int"]>;
  readonly linkImagesToOriginal: Maybe<Scalars["Boolean"]>;
  readonly showCaptions: Maybe<Scalars["Boolean"]>;
  readonly markdownCaptions: Maybe<Scalars["Boolean"]>;
  readonly sizeByPixelDensity: Maybe<Scalars["Boolean"]>;
  readonly backgroundColor: Maybe<Scalars["String"]>;
  readonly quality: Maybe<Scalars["Int"]>;
  readonly withWebp: Maybe<Scalars["Boolean"]>;
  readonly tracedSVG: Maybe<Scalars["Boolean"]>;
  readonly loading: Maybe<Scalars["String"]>;
  readonly disableBgImageOnAlpha: Maybe<Scalars["Boolean"]>;
  readonly disableBgImage: Maybe<Scalars["Boolean"]>;
  readonly wrapperStyle: Maybe<Scalars["String"]>;
  readonly icon: Maybe<Scalars["Boolean"]>;
  readonly offsetY: Maybe<Scalars["Int"]>;
  readonly className: Maybe<Scalars["String"]>;
};

export type SitePluginPluginOptionsPluginsPluginOptionsFilterInput = {
  readonly maxWidth: Maybe<IntQueryOperatorInput>;
  readonly linkImagesToOriginal: Maybe<BooleanQueryOperatorInput>;
  readonly showCaptions: Maybe<BooleanQueryOperatorInput>;
  readonly markdownCaptions: Maybe<BooleanQueryOperatorInput>;
  readonly sizeByPixelDensity: Maybe<BooleanQueryOperatorInput>;
  readonly backgroundColor: Maybe<StringQueryOperatorInput>;
  readonly quality: Maybe<IntQueryOperatorInput>;
  readonly withWebp: Maybe<BooleanQueryOperatorInput>;
  readonly tracedSVG: Maybe<BooleanQueryOperatorInput>;
  readonly loading: Maybe<StringQueryOperatorInput>;
  readonly disableBgImageOnAlpha: Maybe<BooleanQueryOperatorInput>;
  readonly disableBgImage: Maybe<BooleanQueryOperatorInput>;
  readonly wrapperStyle: Maybe<StringQueryOperatorInput>;
  readonly icon: Maybe<BooleanQueryOperatorInput>;
  readonly offsetY: Maybe<IntQueryOperatorInput>;
  readonly className: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPluginOptionsPolicy = {
  readonly __typename?: "SitePluginPluginOptionsPolicy";
  readonly userAgent: Maybe<Scalars["String"]>;
  readonly allow: Maybe<Scalars["String"]>;
};

export type SitePluginPluginOptionsPolicyFilterInput = {
  readonly userAgent: Maybe<StringQueryOperatorInput>;
  readonly allow: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPluginOptionsPolicyFilterListInput = {
  readonly elemMatch: Maybe<SitePluginPluginOptionsPolicyFilterInput>;
};

export type SitePluginPluginOptionsSassOptions = {
  readonly __typename?: "SitePluginPluginOptionsSassOptions";
  readonly includePaths: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
  readonly indentedSyntax: Maybe<Scalars["Boolean"]>;
  readonly indentType: Maybe<Scalars["String"]>;
  readonly indentWidth: Maybe<Scalars["Int"]>;
  readonly linefeed: Maybe<Scalars["String"]>;
  readonly omitSourceMapUrl: Maybe<Scalars["Boolean"]>;
  readonly precision: Maybe<Scalars["Int"]>;
  readonly sourceComments: Maybe<Scalars["Boolean"]>;
  readonly sourceMapContents: Maybe<Scalars["Boolean"]>;
  readonly sourceMapEmbed: Maybe<Scalars["Boolean"]>;
};

export type SitePluginPluginOptionsSassOptionsFilterInput = {
  readonly includePaths: Maybe<StringQueryOperatorInput>;
  readonly indentedSyntax: Maybe<BooleanQueryOperatorInput>;
  readonly indentType: Maybe<StringQueryOperatorInput>;
  readonly indentWidth: Maybe<IntQueryOperatorInput>;
  readonly linefeed: Maybe<StringQueryOperatorInput>;
  readonly omitSourceMapUrl: Maybe<BooleanQueryOperatorInput>;
  readonly precision: Maybe<IntQueryOperatorInput>;
  readonly sourceComments: Maybe<BooleanQueryOperatorInput>;
  readonly sourceMapContents: Maybe<BooleanQueryOperatorInput>;
  readonly sourceMapEmbed: Maybe<BooleanQueryOperatorInput>;
};

export type SitePluginSortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<SitePluginFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};

export type SiteSiteMetadata = {
  readonly __typename?: "SiteSiteMetadata";
  readonly title: Maybe<Scalars["String"]>;
  readonly description: Maybe<Scalars["String"]>;
  readonly language: Maybe<Scalars["String"]>;
  readonly author: Maybe<SiteSiteMetadataAuthor>;
  readonly siteUrl: Maybe<Scalars["String"]>;
  readonly disqus: Maybe<Scalars["String"]>;
  readonly social: Maybe<ReadonlyArray<Maybe<SiteSiteMetadataSocial>>>;
  readonly repository: Maybe<Scalars["String"]>;
  readonly rss: Maybe<Scalars["String"]>;
};

export type SiteSiteMetadataAuthor = {
  readonly __typename?: "SiteSiteMetadataAuthor";
  readonly name: Maybe<Scalars["String"]>;
};

export type SiteSiteMetadataAuthorFilterInput = {
  readonly name: Maybe<StringQueryOperatorInput>;
};

export type SiteSiteMetadataFilterInput = {
  readonly title: Maybe<StringQueryOperatorInput>;
  readonly description: Maybe<StringQueryOperatorInput>;
  readonly language: Maybe<StringQueryOperatorInput>;
  readonly author: Maybe<SiteSiteMetadataAuthorFilterInput>;
  readonly siteUrl: Maybe<StringQueryOperatorInput>;
  readonly disqus: Maybe<StringQueryOperatorInput>;
  readonly social: Maybe<SiteSiteMetadataSocialFilterListInput>;
  readonly repository: Maybe<StringQueryOperatorInput>;
  readonly rss: Maybe<StringQueryOperatorInput>;
};

export type SiteSiteMetadataSocial = {
  readonly __typename?: "SiteSiteMetadataSocial";
  readonly name: Maybe<Scalars["String"]>;
  readonly url: Maybe<Scalars["String"]>;
};

export type SiteSiteMetadataSocialFilterInput = {
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly url: Maybe<StringQueryOperatorInput>;
};

export type SiteSiteMetadataSocialFilterListInput = {
  readonly elemMatch: Maybe<SiteSiteMetadataSocialFilterInput>;
};

export type SiteSortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<SiteFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};

export enum SortOrderEnum {
  Asc = "ASC",
  Desc = "DESC",
}

export type StringQueryOperatorInput = {
  readonly eq: Maybe<Scalars["String"]>;
  readonly ne: Maybe<Scalars["String"]>;
  readonly in: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
  readonly nin: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
  readonly regex: Maybe<Scalars["String"]>;
  readonly glob: Maybe<Scalars["String"]>;
};

export type TransformOptions = {
  readonly grayscale: Maybe<Scalars["Boolean"]>;
  readonly duotone: Maybe<DuotoneGradient>;
  readonly rotate: Maybe<Scalars["Int"]>;
  readonly trim: Maybe<Scalars["Float"]>;
  readonly cropFocus: Maybe<ImageCropFocus>;
  readonly fit: Maybe<ImageFit>;
};

export type WebPOptions = {
  readonly quality: Maybe<Scalars["Int"]>;
};
