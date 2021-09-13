export type Maybe<T> = T | null;
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
  readonly lossless: Maybe<Scalars["Boolean"]>;
  readonly quality: Maybe<Scalars["Int"]>;
  readonly speed: Maybe<Scalars["Int"]>;
};

export type BlurredOptions = {
  /** Force the output format for the low-res preview. Default is to use the same format as the input. You should rarely need to change this */
  readonly toFormat: Maybe<ImageFormat>;
  /** Width of the generated low-res preview. Default is 20px */
  readonly width: Maybe<Scalars["Int"]>;
};

export type BooleanQueryOperatorInput = {
  readonly eq: Maybe<Scalars["Boolean"]>;
  readonly in: Maybe<ReadonlyArray<Maybe<Scalars["Boolean"]>>>;
  readonly ne: Maybe<Scalars["Boolean"]>;
  readonly nin: Maybe<ReadonlyArray<Maybe<Scalars["Boolean"]>>>;
};

export type DateQueryOperatorInput = {
  readonly eq: Maybe<Scalars["Date"]>;
  readonly gt: Maybe<Scalars["Date"]>;
  readonly gte: Maybe<Scalars["Date"]>;
  readonly in: Maybe<ReadonlyArray<Maybe<Scalars["Date"]>>>;
  readonly lt: Maybe<Scalars["Date"]>;
  readonly lte: Maybe<Scalars["Date"]>;
  readonly ne: Maybe<Scalars["Date"]>;
  readonly nin: Maybe<ReadonlyArray<Maybe<Scalars["Date"]>>>;
};

export type Directory = Node & {
  readonly __typename?: "Directory";
  readonly absolutePath: Scalars["String"];
  readonly accessTime: Scalars["Date"];
  readonly atime: Scalars["Date"];
  readonly atimeMs: Scalars["Float"];
  readonly base: Scalars["String"];
  readonly birthTime: Scalars["Date"];
  /** @deprecated Use `birthTime` instead */
  readonly birthtime: Maybe<Scalars["Date"]>;
  /** @deprecated Use `birthTime` instead */
  readonly birthtimeMs: Maybe<Scalars["Float"]>;
  readonly blksize: Maybe<Scalars["Int"]>;
  readonly blocks: Maybe<Scalars["Int"]>;
  readonly changeTime: Scalars["Date"];
  readonly children: ReadonlyArray<Node>;
  readonly ctime: Scalars["Date"];
  readonly ctimeMs: Scalars["Float"];
  readonly dev: Scalars["Int"];
  readonly dir: Scalars["String"];
  readonly ext: Scalars["String"];
  readonly extension: Scalars["String"];
  readonly gid: Scalars["Int"];
  readonly id: Scalars["ID"];
  readonly ino: Scalars["Float"];
  readonly internal: Internal;
  readonly mode: Scalars["Int"];
  readonly modifiedTime: Scalars["Date"];
  readonly mtime: Scalars["Date"];
  readonly mtimeMs: Scalars["Float"];
  readonly name: Scalars["String"];
  readonly nlink: Scalars["Int"];
  readonly parent: Maybe<Node>;
  readonly prettySize: Scalars["String"];
  readonly rdev: Scalars["Int"];
  readonly relativeDirectory: Scalars["String"];
  readonly relativePath: Scalars["String"];
  readonly root: Scalars["String"];
  readonly size: Scalars["Int"];
  readonly sourceInstanceName: Scalars["String"];
  readonly uid: Scalars["Int"];
};

export type DirectoryAccessTimeArgs = {
  difference: Maybe<Scalars["String"]>;
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  locale: Maybe<Scalars["String"]>;
};

export type DirectoryAtimeArgs = {
  difference: Maybe<Scalars["String"]>;
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  locale: Maybe<Scalars["String"]>;
};

export type DirectoryBirthTimeArgs = {
  difference: Maybe<Scalars["String"]>;
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  locale: Maybe<Scalars["String"]>;
};

export type DirectoryChangeTimeArgs = {
  difference: Maybe<Scalars["String"]>;
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  locale: Maybe<Scalars["String"]>;
};

export type DirectoryCtimeArgs = {
  difference: Maybe<Scalars["String"]>;
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  locale: Maybe<Scalars["String"]>;
};

export type DirectoryModifiedTimeArgs = {
  difference: Maybe<Scalars["String"]>;
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  locale: Maybe<Scalars["String"]>;
};

export type DirectoryMtimeArgs = {
  difference: Maybe<Scalars["String"]>;
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  locale: Maybe<Scalars["String"]>;
};

export type DirectoryConnection = {
  readonly __typename?: "DirectoryConnection";
  readonly distinct: ReadonlyArray<Scalars["String"]>;
  readonly edges: ReadonlyArray<DirectoryEdge>;
  readonly group: ReadonlyArray<DirectoryGroupConnection>;
  readonly max: Maybe<Scalars["Float"]>;
  readonly min: Maybe<Scalars["Float"]>;
  readonly nodes: ReadonlyArray<Directory>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars["Float"]>;
  readonly totalCount: Scalars["Int"];
};

export type DirectoryConnectionDistinctArgs = {
  field: DirectoryFieldsEnum;
};

export type DirectoryConnectionGroupArgs = {
  field: DirectoryFieldsEnum;
  limit: Maybe<Scalars["Int"]>;
  skip: Maybe<Scalars["Int"]>;
};

export type DirectoryConnectionMaxArgs = {
  field: DirectoryFieldsEnum;
};

export type DirectoryConnectionMinArgs = {
  field: DirectoryFieldsEnum;
};

export type DirectoryConnectionSumArgs = {
  field: DirectoryFieldsEnum;
};

export type DirectoryEdge = {
  readonly __typename?: "DirectoryEdge";
  readonly next: Maybe<Directory>;
  readonly node: Directory;
  readonly previous: Maybe<Directory>;
};

export enum DirectoryFieldsEnum {
  AbsolutePath = "absolutePath",
  AccessTime = "accessTime",
  Atime = "atime",
  AtimeMs = "atimeMs",
  Base = "base",
  BirthTime = "birthTime",
  Birthtime = "birthtime",
  BirthtimeMs = "birthtimeMs",
  Blksize = "blksize",
  Blocks = "blocks",
  ChangeTime = "changeTime",
  Children = "children",
  ChildrenChildren = "children___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenId = "children___id",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentParentId = "children___parent___parent___id",
  Ctime = "ctime",
  CtimeMs = "ctimeMs",
  Dev = "dev",
  Dir = "dir",
  Ext = "ext",
  Extension = "extension",
  Gid = "gid",
  Id = "id",
  Ino = "ino",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
  Mode = "mode",
  ModifiedTime = "modifiedTime",
  Mtime = "mtime",
  MtimeMs = "mtimeMs",
  Name = "name",
  Nlink = "nlink",
  ParentChildren = "parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenId = "parent___children___id",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentId = "parent___id",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentId = "parent___parent___id",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentParentId = "parent___parent___parent___id",
  PrettySize = "prettySize",
  Rdev = "rdev",
  RelativeDirectory = "relativeDirectory",
  RelativePath = "relativePath",
  Root = "root",
  Size = "size",
  SourceInstanceName = "sourceInstanceName",
  Uid = "uid",
}

export type DirectoryFilterInput = {
  readonly absolutePath: Maybe<StringQueryOperatorInput>;
  readonly accessTime: Maybe<DateQueryOperatorInput>;
  readonly atime: Maybe<DateQueryOperatorInput>;
  readonly atimeMs: Maybe<FloatQueryOperatorInput>;
  readonly base: Maybe<StringQueryOperatorInput>;
  readonly birthTime: Maybe<DateQueryOperatorInput>;
  readonly birthtime: Maybe<DateQueryOperatorInput>;
  readonly birthtimeMs: Maybe<FloatQueryOperatorInput>;
  readonly blksize: Maybe<IntQueryOperatorInput>;
  readonly blocks: Maybe<IntQueryOperatorInput>;
  readonly changeTime: Maybe<DateQueryOperatorInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly ctime: Maybe<DateQueryOperatorInput>;
  readonly ctimeMs: Maybe<FloatQueryOperatorInput>;
  readonly dev: Maybe<IntQueryOperatorInput>;
  readonly dir: Maybe<StringQueryOperatorInput>;
  readonly ext: Maybe<StringQueryOperatorInput>;
  readonly extension: Maybe<StringQueryOperatorInput>;
  readonly gid: Maybe<IntQueryOperatorInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly ino: Maybe<FloatQueryOperatorInput>;
  readonly internal: Maybe<InternalFilterInput>;
  readonly mode: Maybe<IntQueryOperatorInput>;
  readonly modifiedTime: Maybe<DateQueryOperatorInput>;
  readonly mtime: Maybe<DateQueryOperatorInput>;
  readonly mtimeMs: Maybe<FloatQueryOperatorInput>;
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly nlink: Maybe<IntQueryOperatorInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly prettySize: Maybe<StringQueryOperatorInput>;
  readonly rdev: Maybe<IntQueryOperatorInput>;
  readonly relativeDirectory: Maybe<StringQueryOperatorInput>;
  readonly relativePath: Maybe<StringQueryOperatorInput>;
  readonly root: Maybe<StringQueryOperatorInput>;
  readonly size: Maybe<IntQueryOperatorInput>;
  readonly sourceInstanceName: Maybe<StringQueryOperatorInput>;
  readonly uid: Maybe<IntQueryOperatorInput>;
};

export type DirectoryGroupConnection = {
  readonly __typename?: "DirectoryGroupConnection";
  readonly edges: ReadonlyArray<DirectoryEdge>;
  readonly field: Scalars["String"];
  readonly fieldValue: Maybe<Scalars["String"]>;
  readonly nodes: ReadonlyArray<Directory>;
  readonly pageInfo: PageInfo;
  readonly totalCount: Scalars["Int"];
};

export type DirectorySortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<DirectoryFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};

export type DuotoneGradient = {
  readonly highlight: Scalars["String"];
  readonly opacity: Maybe<Scalars["Int"]>;
  readonly shadow: Scalars["String"];
};

export type File = Node & {
  readonly __typename?: "File";
  readonly absolutePath: Scalars["String"];
  readonly accessTime: Scalars["Date"];
  readonly atime: Scalars["Date"];
  readonly atimeMs: Scalars["Float"];
  readonly base: Scalars["String"];
  readonly birthTime: Scalars["Date"];
  /** @deprecated Use `birthTime` instead */
  readonly birthtime: Maybe<Scalars["Date"]>;
  /** @deprecated Use `birthTime` instead */
  readonly birthtimeMs: Maybe<Scalars["Float"]>;
  readonly blksize: Maybe<Scalars["Int"]>;
  readonly blocks: Maybe<Scalars["Int"]>;
  readonly changeTime: Scalars["Date"];
  /** Returns the first child node of type ImageSharp or null if there are no children of given type on this node */
  readonly childImageSharp: Maybe<ImageSharp>;
  /** Returns the first child node of type MarkdownRemark or null if there are no children of given type on this node */
  readonly childMarkdownRemark: Maybe<MarkdownRemark>;
  readonly children: ReadonlyArray<Node>;
  /** Returns all children nodes filtered by type ImageSharp */
  readonly childrenImageSharp: Maybe<ReadonlyArray<Maybe<ImageSharp>>>;
  /** Returns all children nodes filtered by type MarkdownRemark */
  readonly childrenMarkdownRemark: Maybe<ReadonlyArray<Maybe<MarkdownRemark>>>;
  readonly ctime: Scalars["Date"];
  readonly ctimeMs: Scalars["Float"];
  readonly dev: Scalars["Int"];
  readonly dir: Scalars["String"];
  readonly ext: Scalars["String"];
  readonly extension: Scalars["String"];
  readonly gid: Scalars["Int"];
  readonly id: Scalars["ID"];
  readonly ino: Scalars["Float"];
  readonly internal: Internal;
  readonly mode: Scalars["Int"];
  readonly modifiedTime: Scalars["Date"];
  readonly mtime: Scalars["Date"];
  readonly mtimeMs: Scalars["Float"];
  readonly name: Scalars["String"];
  readonly nlink: Scalars["Int"];
  readonly parent: Maybe<Node>;
  readonly prettySize: Scalars["String"];
  /** Copy file to static directory and return public url to it */
  readonly publicURL: Maybe<Scalars["String"]>;
  readonly rdev: Scalars["Int"];
  readonly relativeDirectory: Scalars["String"];
  readonly relativePath: Scalars["String"];
  readonly root: Scalars["String"];
  readonly size: Scalars["Int"];
  readonly sourceInstanceName: Scalars["String"];
  readonly uid: Scalars["Int"];
  readonly url: Maybe<Scalars["String"]>;
};

export type FileAccessTimeArgs = {
  difference: Maybe<Scalars["String"]>;
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  locale: Maybe<Scalars["String"]>;
};

export type FileAtimeArgs = {
  difference: Maybe<Scalars["String"]>;
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  locale: Maybe<Scalars["String"]>;
};

export type FileBirthTimeArgs = {
  difference: Maybe<Scalars["String"]>;
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  locale: Maybe<Scalars["String"]>;
};

export type FileChangeTimeArgs = {
  difference: Maybe<Scalars["String"]>;
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  locale: Maybe<Scalars["String"]>;
};

export type FileCtimeArgs = {
  difference: Maybe<Scalars["String"]>;
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  locale: Maybe<Scalars["String"]>;
};

export type FileModifiedTimeArgs = {
  difference: Maybe<Scalars["String"]>;
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  locale: Maybe<Scalars["String"]>;
};

export type FileMtimeArgs = {
  difference: Maybe<Scalars["String"]>;
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  locale: Maybe<Scalars["String"]>;
};

export type FileConnection = {
  readonly __typename?: "FileConnection";
  readonly distinct: ReadonlyArray<Scalars["String"]>;
  readonly edges: ReadonlyArray<FileEdge>;
  readonly group: ReadonlyArray<FileGroupConnection>;
  readonly max: Maybe<Scalars["Float"]>;
  readonly min: Maybe<Scalars["Float"]>;
  readonly nodes: ReadonlyArray<File>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars["Float"]>;
  readonly totalCount: Scalars["Int"];
};

export type FileConnectionDistinctArgs = {
  field: FileFieldsEnum;
};

export type FileConnectionGroupArgs = {
  field: FileFieldsEnum;
  limit: Maybe<Scalars["Int"]>;
  skip: Maybe<Scalars["Int"]>;
};

export type FileConnectionMaxArgs = {
  field: FileFieldsEnum;
};

export type FileConnectionMinArgs = {
  field: FileFieldsEnum;
};

export type FileConnectionSumArgs = {
  field: FileFieldsEnum;
};

export type FileEdge = {
  readonly __typename?: "FileEdge";
  readonly next: Maybe<File>;
  readonly node: File;
  readonly previous: Maybe<File>;
};

export enum FileFieldsEnum {
  AbsolutePath = "absolutePath",
  AccessTime = "accessTime",
  Atime = "atime",
  AtimeMs = "atimeMs",
  Base = "base",
  BirthTime = "birthTime",
  Birthtime = "birthtime",
  BirthtimeMs = "birthtimeMs",
  Blksize = "blksize",
  Blocks = "blocks",
  ChangeTime = "changeTime",
  ChildImageSharpChildren = "childImageSharp___children",
  ChildImageSharpChildrenChildren = "childImageSharp___children___children",
  ChildImageSharpChildrenChildrenChildren = "childImageSharp___children___children___children",
  ChildImageSharpChildrenChildrenId = "childImageSharp___children___children___id",
  ChildImageSharpChildrenId = "childImageSharp___children___id",
  ChildImageSharpChildrenInternalContent = "childImageSharp___children___internal___content",
  ChildImageSharpChildrenInternalContentDigest = "childImageSharp___children___internal___contentDigest",
  ChildImageSharpChildrenInternalDescription = "childImageSharp___children___internal___description",
  ChildImageSharpChildrenInternalFieldOwners = "childImageSharp___children___internal___fieldOwners",
  ChildImageSharpChildrenInternalIgnoreType = "childImageSharp___children___internal___ignoreType",
  ChildImageSharpChildrenInternalMediaType = "childImageSharp___children___internal___mediaType",
  ChildImageSharpChildrenInternalOwner = "childImageSharp___children___internal___owner",
  ChildImageSharpChildrenInternalType = "childImageSharp___children___internal___type",
  ChildImageSharpChildrenParentChildren = "childImageSharp___children___parent___children",
  ChildImageSharpChildrenParentId = "childImageSharp___children___parent___id",
  ChildImageSharpFixedAspectRatio = "childImageSharp___fixed___aspectRatio",
  ChildImageSharpFixedBase64 = "childImageSharp___fixed___base64",
  ChildImageSharpFixedHeight = "childImageSharp___fixed___height",
  ChildImageSharpFixedOriginalName = "childImageSharp___fixed___originalName",
  ChildImageSharpFixedSrc = "childImageSharp___fixed___src",
  ChildImageSharpFixedSrcSet = "childImageSharp___fixed___srcSet",
  ChildImageSharpFixedSrcSetWebp = "childImageSharp___fixed___srcSetWebp",
  ChildImageSharpFixedSrcWebp = "childImageSharp___fixed___srcWebp",
  ChildImageSharpFixedTracedSvg = "childImageSharp___fixed___tracedSVG",
  ChildImageSharpFixedWidth = "childImageSharp___fixed___width",
  ChildImageSharpFluidAspectRatio = "childImageSharp___fluid___aspectRatio",
  ChildImageSharpFluidBase64 = "childImageSharp___fluid___base64",
  ChildImageSharpFluidOriginalImg = "childImageSharp___fluid___originalImg",
  ChildImageSharpFluidOriginalName = "childImageSharp___fluid___originalName",
  ChildImageSharpFluidPresentationHeight = "childImageSharp___fluid___presentationHeight",
  ChildImageSharpFluidPresentationWidth = "childImageSharp___fluid___presentationWidth",
  ChildImageSharpFluidSizes = "childImageSharp___fluid___sizes",
  ChildImageSharpFluidSrc = "childImageSharp___fluid___src",
  ChildImageSharpFluidSrcSet = "childImageSharp___fluid___srcSet",
  ChildImageSharpFluidSrcSetWebp = "childImageSharp___fluid___srcSetWebp",
  ChildImageSharpFluidSrcWebp = "childImageSharp___fluid___srcWebp",
  ChildImageSharpFluidTracedSvg = "childImageSharp___fluid___tracedSVG",
  ChildImageSharpGatsbyImageData = "childImageSharp___gatsbyImageData",
  ChildImageSharpId = "childImageSharp___id",
  ChildImageSharpInternalContent = "childImageSharp___internal___content",
  ChildImageSharpInternalContentDigest = "childImageSharp___internal___contentDigest",
  ChildImageSharpInternalDescription = "childImageSharp___internal___description",
  ChildImageSharpInternalFieldOwners = "childImageSharp___internal___fieldOwners",
  ChildImageSharpInternalIgnoreType = "childImageSharp___internal___ignoreType",
  ChildImageSharpInternalMediaType = "childImageSharp___internal___mediaType",
  ChildImageSharpInternalOwner = "childImageSharp___internal___owner",
  ChildImageSharpInternalType = "childImageSharp___internal___type",
  ChildImageSharpOriginalHeight = "childImageSharp___original___height",
  ChildImageSharpOriginalSrc = "childImageSharp___original___src",
  ChildImageSharpOriginalWidth = "childImageSharp___original___width",
  ChildImageSharpParentChildren = "childImageSharp___parent___children",
  ChildImageSharpParentChildrenChildren = "childImageSharp___parent___children___children",
  ChildImageSharpParentChildrenId = "childImageSharp___parent___children___id",
  ChildImageSharpParentId = "childImageSharp___parent___id",
  ChildImageSharpParentInternalContent = "childImageSharp___parent___internal___content",
  ChildImageSharpParentInternalContentDigest = "childImageSharp___parent___internal___contentDigest",
  ChildImageSharpParentInternalDescription = "childImageSharp___parent___internal___description",
  ChildImageSharpParentInternalFieldOwners = "childImageSharp___parent___internal___fieldOwners",
  ChildImageSharpParentInternalIgnoreType = "childImageSharp___parent___internal___ignoreType",
  ChildImageSharpParentInternalMediaType = "childImageSharp___parent___internal___mediaType",
  ChildImageSharpParentInternalOwner = "childImageSharp___parent___internal___owner",
  ChildImageSharpParentInternalType = "childImageSharp___parent___internal___type",
  ChildImageSharpParentParentChildren = "childImageSharp___parent___parent___children",
  ChildImageSharpParentParentId = "childImageSharp___parent___parent___id",
  ChildImageSharpResizeAspectRatio = "childImageSharp___resize___aspectRatio",
  ChildImageSharpResizeHeight = "childImageSharp___resize___height",
  ChildImageSharpResizeOriginalName = "childImageSharp___resize___originalName",
  ChildImageSharpResizeSrc = "childImageSharp___resize___src",
  ChildImageSharpResizeTracedSvg = "childImageSharp___resize___tracedSVG",
  ChildImageSharpResizeWidth = "childImageSharp___resize___width",
  ChildMarkdownRemarkChildren = "childMarkdownRemark___children",
  ChildMarkdownRemarkChildrenChildren = "childMarkdownRemark___children___children",
  ChildMarkdownRemarkChildrenChildrenChildren = "childMarkdownRemark___children___children___children",
  ChildMarkdownRemarkChildrenChildrenId = "childMarkdownRemark___children___children___id",
  ChildMarkdownRemarkChildrenId = "childMarkdownRemark___children___id",
  ChildMarkdownRemarkChildrenInternalContent = "childMarkdownRemark___children___internal___content",
  ChildMarkdownRemarkChildrenInternalContentDigest = "childMarkdownRemark___children___internal___contentDigest",
  ChildMarkdownRemarkChildrenInternalDescription = "childMarkdownRemark___children___internal___description",
  ChildMarkdownRemarkChildrenInternalFieldOwners = "childMarkdownRemark___children___internal___fieldOwners",
  ChildMarkdownRemarkChildrenInternalIgnoreType = "childMarkdownRemark___children___internal___ignoreType",
  ChildMarkdownRemarkChildrenInternalMediaType = "childMarkdownRemark___children___internal___mediaType",
  ChildMarkdownRemarkChildrenInternalOwner = "childMarkdownRemark___children___internal___owner",
  ChildMarkdownRemarkChildrenInternalType = "childMarkdownRemark___children___internal___type",
  ChildMarkdownRemarkChildrenParentChildren = "childMarkdownRemark___children___parent___children",
  ChildMarkdownRemarkChildrenParentId = "childMarkdownRemark___children___parent___id",
  ChildMarkdownRemarkExcerpt = "childMarkdownRemark___excerpt",
  ChildMarkdownRemarkExcerptAst = "childMarkdownRemark___excerptAst",
  ChildMarkdownRemarkFieldsSlug = "childMarkdownRemark___fields___slug",
  ChildMarkdownRemarkFileAbsolutePath = "childMarkdownRemark___fileAbsolutePath",
  ChildMarkdownRemarkFrontmatterAuthor = "childMarkdownRemark___frontmatter___author",
  ChildMarkdownRemarkFrontmatterCategories = "childMarkdownRemark___frontmatter___categories",
  ChildMarkdownRemarkFrontmatterDate = "childMarkdownRemark___frontmatter___date",
  ChildMarkdownRemarkFrontmatterExcerpt = "childMarkdownRemark___frontmatter___excerpt",
  ChildMarkdownRemarkFrontmatterHero = "childMarkdownRemark___frontmatter___hero",
  ChildMarkdownRemarkFrontmatterLang = "childMarkdownRemark___frontmatter___lang",
  ChildMarkdownRemarkFrontmatterTitle = "childMarkdownRemark___frontmatter___title",
  ChildMarkdownRemarkFrontmatterType = "childMarkdownRemark___frontmatter___type",
  ChildMarkdownRemarkHeadings = "childMarkdownRemark___headings",
  ChildMarkdownRemarkHeadingsDepth = "childMarkdownRemark___headings___depth",
  ChildMarkdownRemarkHeadingsId = "childMarkdownRemark___headings___id",
  ChildMarkdownRemarkHeadingsValue = "childMarkdownRemark___headings___value",
  ChildMarkdownRemarkHeroAbsolutePath = "childMarkdownRemark___hero___absolutePath",
  ChildMarkdownRemarkHeroAccessTime = "childMarkdownRemark___hero___accessTime",
  ChildMarkdownRemarkHeroAtime = "childMarkdownRemark___hero___atime",
  ChildMarkdownRemarkHeroAtimeMs = "childMarkdownRemark___hero___atimeMs",
  ChildMarkdownRemarkHeroBase = "childMarkdownRemark___hero___base",
  ChildMarkdownRemarkHeroBirthTime = "childMarkdownRemark___hero___birthTime",
  ChildMarkdownRemarkHeroBirthtime = "childMarkdownRemark___hero___birthtime",
  ChildMarkdownRemarkHeroBirthtimeMs = "childMarkdownRemark___hero___birthtimeMs",
  ChildMarkdownRemarkHeroBlksize = "childMarkdownRemark___hero___blksize",
  ChildMarkdownRemarkHeroBlocks = "childMarkdownRemark___hero___blocks",
  ChildMarkdownRemarkHeroChangeTime = "childMarkdownRemark___hero___changeTime",
  ChildMarkdownRemarkHeroChildImageSharpChildren = "childMarkdownRemark___hero___childImageSharp___children",
  ChildMarkdownRemarkHeroChildImageSharpGatsbyImageData = "childMarkdownRemark___hero___childImageSharp___gatsbyImageData",
  ChildMarkdownRemarkHeroChildImageSharpId = "childMarkdownRemark___hero___childImageSharp___id",
  ChildMarkdownRemarkHeroChildMarkdownRemarkChildren = "childMarkdownRemark___hero___childMarkdownRemark___children",
  ChildMarkdownRemarkHeroChildMarkdownRemarkExcerpt = "childMarkdownRemark___hero___childMarkdownRemark___excerpt",
  ChildMarkdownRemarkHeroChildMarkdownRemarkExcerptAst = "childMarkdownRemark___hero___childMarkdownRemark___excerptAst",
  ChildMarkdownRemarkHeroChildMarkdownRemarkFileAbsolutePath = "childMarkdownRemark___hero___childMarkdownRemark___fileAbsolutePath",
  ChildMarkdownRemarkHeroChildMarkdownRemarkHeadings = "childMarkdownRemark___hero___childMarkdownRemark___headings",
  ChildMarkdownRemarkHeroChildMarkdownRemarkHtml = "childMarkdownRemark___hero___childMarkdownRemark___html",
  ChildMarkdownRemarkHeroChildMarkdownRemarkHtmlAst = "childMarkdownRemark___hero___childMarkdownRemark___htmlAst",
  ChildMarkdownRemarkHeroChildMarkdownRemarkId = "childMarkdownRemark___hero___childMarkdownRemark___id",
  ChildMarkdownRemarkHeroChildMarkdownRemarkRawMarkdownBody = "childMarkdownRemark___hero___childMarkdownRemark___rawMarkdownBody",
  ChildMarkdownRemarkHeroChildMarkdownRemarkTableOfContents = "childMarkdownRemark___hero___childMarkdownRemark___tableOfContents",
  ChildMarkdownRemarkHeroChildMarkdownRemarkTimeToRead = "childMarkdownRemark___hero___childMarkdownRemark___timeToRead",
  ChildMarkdownRemarkHeroChildren = "childMarkdownRemark___hero___children",
  ChildMarkdownRemarkHeroChildrenImageSharp = "childMarkdownRemark___hero___childrenImageSharp",
  ChildMarkdownRemarkHeroChildrenImageSharpChildren = "childMarkdownRemark___hero___childrenImageSharp___children",
  ChildMarkdownRemarkHeroChildrenImageSharpGatsbyImageData = "childMarkdownRemark___hero___childrenImageSharp___gatsbyImageData",
  ChildMarkdownRemarkHeroChildrenImageSharpId = "childMarkdownRemark___hero___childrenImageSharp___id",
  ChildMarkdownRemarkHeroChildrenMarkdownRemark = "childMarkdownRemark___hero___childrenMarkdownRemark",
  ChildMarkdownRemarkHeroChildrenMarkdownRemarkChildren = "childMarkdownRemark___hero___childrenMarkdownRemark___children",
  ChildMarkdownRemarkHeroChildrenMarkdownRemarkExcerpt = "childMarkdownRemark___hero___childrenMarkdownRemark___excerpt",
  ChildMarkdownRemarkHeroChildrenMarkdownRemarkExcerptAst = "childMarkdownRemark___hero___childrenMarkdownRemark___excerptAst",
  ChildMarkdownRemarkHeroChildrenMarkdownRemarkFileAbsolutePath = "childMarkdownRemark___hero___childrenMarkdownRemark___fileAbsolutePath",
  ChildMarkdownRemarkHeroChildrenMarkdownRemarkHeadings = "childMarkdownRemark___hero___childrenMarkdownRemark___headings",
  ChildMarkdownRemarkHeroChildrenMarkdownRemarkHtml = "childMarkdownRemark___hero___childrenMarkdownRemark___html",
  ChildMarkdownRemarkHeroChildrenMarkdownRemarkHtmlAst = "childMarkdownRemark___hero___childrenMarkdownRemark___htmlAst",
  ChildMarkdownRemarkHeroChildrenMarkdownRemarkId = "childMarkdownRemark___hero___childrenMarkdownRemark___id",
  ChildMarkdownRemarkHeroChildrenMarkdownRemarkRawMarkdownBody = "childMarkdownRemark___hero___childrenMarkdownRemark___rawMarkdownBody",
  ChildMarkdownRemarkHeroChildrenMarkdownRemarkTableOfContents = "childMarkdownRemark___hero___childrenMarkdownRemark___tableOfContents",
  ChildMarkdownRemarkHeroChildrenMarkdownRemarkTimeToRead = "childMarkdownRemark___hero___childrenMarkdownRemark___timeToRead",
  ChildMarkdownRemarkHeroChildrenChildren = "childMarkdownRemark___hero___children___children",
  ChildMarkdownRemarkHeroChildrenId = "childMarkdownRemark___hero___children___id",
  ChildMarkdownRemarkHeroCtime = "childMarkdownRemark___hero___ctime",
  ChildMarkdownRemarkHeroCtimeMs = "childMarkdownRemark___hero___ctimeMs",
  ChildMarkdownRemarkHeroDev = "childMarkdownRemark___hero___dev",
  ChildMarkdownRemarkHeroDir = "childMarkdownRemark___hero___dir",
  ChildMarkdownRemarkHeroExt = "childMarkdownRemark___hero___ext",
  ChildMarkdownRemarkHeroExtension = "childMarkdownRemark___hero___extension",
  ChildMarkdownRemarkHeroGid = "childMarkdownRemark___hero___gid",
  ChildMarkdownRemarkHeroId = "childMarkdownRemark___hero___id",
  ChildMarkdownRemarkHeroIno = "childMarkdownRemark___hero___ino",
  ChildMarkdownRemarkHeroInternalContent = "childMarkdownRemark___hero___internal___content",
  ChildMarkdownRemarkHeroInternalContentDigest = "childMarkdownRemark___hero___internal___contentDigest",
  ChildMarkdownRemarkHeroInternalDescription = "childMarkdownRemark___hero___internal___description",
  ChildMarkdownRemarkHeroInternalFieldOwners = "childMarkdownRemark___hero___internal___fieldOwners",
  ChildMarkdownRemarkHeroInternalIgnoreType = "childMarkdownRemark___hero___internal___ignoreType",
  ChildMarkdownRemarkHeroInternalMediaType = "childMarkdownRemark___hero___internal___mediaType",
  ChildMarkdownRemarkHeroInternalOwner = "childMarkdownRemark___hero___internal___owner",
  ChildMarkdownRemarkHeroInternalType = "childMarkdownRemark___hero___internal___type",
  ChildMarkdownRemarkHeroMode = "childMarkdownRemark___hero___mode",
  ChildMarkdownRemarkHeroModifiedTime = "childMarkdownRemark___hero___modifiedTime",
  ChildMarkdownRemarkHeroMtime = "childMarkdownRemark___hero___mtime",
  ChildMarkdownRemarkHeroMtimeMs = "childMarkdownRemark___hero___mtimeMs",
  ChildMarkdownRemarkHeroName = "childMarkdownRemark___hero___name",
  ChildMarkdownRemarkHeroNlink = "childMarkdownRemark___hero___nlink",
  ChildMarkdownRemarkHeroParentChildren = "childMarkdownRemark___hero___parent___children",
  ChildMarkdownRemarkHeroParentId = "childMarkdownRemark___hero___parent___id",
  ChildMarkdownRemarkHeroPrettySize = "childMarkdownRemark___hero___prettySize",
  ChildMarkdownRemarkHeroPublicUrl = "childMarkdownRemark___hero___publicURL",
  ChildMarkdownRemarkHeroRdev = "childMarkdownRemark___hero___rdev",
  ChildMarkdownRemarkHeroRelativeDirectory = "childMarkdownRemark___hero___relativeDirectory",
  ChildMarkdownRemarkHeroRelativePath = "childMarkdownRemark___hero___relativePath",
  ChildMarkdownRemarkHeroRoot = "childMarkdownRemark___hero___root",
  ChildMarkdownRemarkHeroSize = "childMarkdownRemark___hero___size",
  ChildMarkdownRemarkHeroSourceInstanceName = "childMarkdownRemark___hero___sourceInstanceName",
  ChildMarkdownRemarkHeroUid = "childMarkdownRemark___hero___uid",
  ChildMarkdownRemarkHeroUrl = "childMarkdownRemark___hero___url",
  ChildMarkdownRemarkHtml = "childMarkdownRemark___html",
  ChildMarkdownRemarkHtmlAst = "childMarkdownRemark___htmlAst",
  ChildMarkdownRemarkId = "childMarkdownRemark___id",
  ChildMarkdownRemarkInternalContent = "childMarkdownRemark___internal___content",
  ChildMarkdownRemarkInternalContentDigest = "childMarkdownRemark___internal___contentDigest",
  ChildMarkdownRemarkInternalDescription = "childMarkdownRemark___internal___description",
  ChildMarkdownRemarkInternalFieldOwners = "childMarkdownRemark___internal___fieldOwners",
  ChildMarkdownRemarkInternalIgnoreType = "childMarkdownRemark___internal___ignoreType",
  ChildMarkdownRemarkInternalMediaType = "childMarkdownRemark___internal___mediaType",
  ChildMarkdownRemarkInternalOwner = "childMarkdownRemark___internal___owner",
  ChildMarkdownRemarkInternalType = "childMarkdownRemark___internal___type",
  ChildMarkdownRemarkParentChildren = "childMarkdownRemark___parent___children",
  ChildMarkdownRemarkParentChildrenChildren = "childMarkdownRemark___parent___children___children",
  ChildMarkdownRemarkParentChildrenId = "childMarkdownRemark___parent___children___id",
  ChildMarkdownRemarkParentId = "childMarkdownRemark___parent___id",
  ChildMarkdownRemarkParentInternalContent = "childMarkdownRemark___parent___internal___content",
  ChildMarkdownRemarkParentInternalContentDigest = "childMarkdownRemark___parent___internal___contentDigest",
  ChildMarkdownRemarkParentInternalDescription = "childMarkdownRemark___parent___internal___description",
  ChildMarkdownRemarkParentInternalFieldOwners = "childMarkdownRemark___parent___internal___fieldOwners",
  ChildMarkdownRemarkParentInternalIgnoreType = "childMarkdownRemark___parent___internal___ignoreType",
  ChildMarkdownRemarkParentInternalMediaType = "childMarkdownRemark___parent___internal___mediaType",
  ChildMarkdownRemarkParentInternalOwner = "childMarkdownRemark___parent___internal___owner",
  ChildMarkdownRemarkParentInternalType = "childMarkdownRemark___parent___internal___type",
  ChildMarkdownRemarkParentParentChildren = "childMarkdownRemark___parent___parent___children",
  ChildMarkdownRemarkParentParentId = "childMarkdownRemark___parent___parent___id",
  ChildMarkdownRemarkRawMarkdownBody = "childMarkdownRemark___rawMarkdownBody",
  ChildMarkdownRemarkTableOfContents = "childMarkdownRemark___tableOfContents",
  ChildMarkdownRemarkTimeToRead = "childMarkdownRemark___timeToRead",
  ChildMarkdownRemarkWordCountParagraphs = "childMarkdownRemark___wordCount___paragraphs",
  ChildMarkdownRemarkWordCountSentences = "childMarkdownRemark___wordCount___sentences",
  ChildMarkdownRemarkWordCountWords = "childMarkdownRemark___wordCount___words",
  Children = "children",
  ChildrenImageSharp = "childrenImageSharp",
  ChildrenImageSharpChildren = "childrenImageSharp___children",
  ChildrenImageSharpChildrenChildren = "childrenImageSharp___children___children",
  ChildrenImageSharpChildrenChildrenChildren = "childrenImageSharp___children___children___children",
  ChildrenImageSharpChildrenChildrenId = "childrenImageSharp___children___children___id",
  ChildrenImageSharpChildrenId = "childrenImageSharp___children___id",
  ChildrenImageSharpChildrenInternalContent = "childrenImageSharp___children___internal___content",
  ChildrenImageSharpChildrenInternalContentDigest = "childrenImageSharp___children___internal___contentDigest",
  ChildrenImageSharpChildrenInternalDescription = "childrenImageSharp___children___internal___description",
  ChildrenImageSharpChildrenInternalFieldOwners = "childrenImageSharp___children___internal___fieldOwners",
  ChildrenImageSharpChildrenInternalIgnoreType = "childrenImageSharp___children___internal___ignoreType",
  ChildrenImageSharpChildrenInternalMediaType = "childrenImageSharp___children___internal___mediaType",
  ChildrenImageSharpChildrenInternalOwner = "childrenImageSharp___children___internal___owner",
  ChildrenImageSharpChildrenInternalType = "childrenImageSharp___children___internal___type",
  ChildrenImageSharpChildrenParentChildren = "childrenImageSharp___children___parent___children",
  ChildrenImageSharpChildrenParentId = "childrenImageSharp___children___parent___id",
  ChildrenImageSharpFixedAspectRatio = "childrenImageSharp___fixed___aspectRatio",
  ChildrenImageSharpFixedBase64 = "childrenImageSharp___fixed___base64",
  ChildrenImageSharpFixedHeight = "childrenImageSharp___fixed___height",
  ChildrenImageSharpFixedOriginalName = "childrenImageSharp___fixed___originalName",
  ChildrenImageSharpFixedSrc = "childrenImageSharp___fixed___src",
  ChildrenImageSharpFixedSrcSet = "childrenImageSharp___fixed___srcSet",
  ChildrenImageSharpFixedSrcSetWebp = "childrenImageSharp___fixed___srcSetWebp",
  ChildrenImageSharpFixedSrcWebp = "childrenImageSharp___fixed___srcWebp",
  ChildrenImageSharpFixedTracedSvg = "childrenImageSharp___fixed___tracedSVG",
  ChildrenImageSharpFixedWidth = "childrenImageSharp___fixed___width",
  ChildrenImageSharpFluidAspectRatio = "childrenImageSharp___fluid___aspectRatio",
  ChildrenImageSharpFluidBase64 = "childrenImageSharp___fluid___base64",
  ChildrenImageSharpFluidOriginalImg = "childrenImageSharp___fluid___originalImg",
  ChildrenImageSharpFluidOriginalName = "childrenImageSharp___fluid___originalName",
  ChildrenImageSharpFluidPresentationHeight = "childrenImageSharp___fluid___presentationHeight",
  ChildrenImageSharpFluidPresentationWidth = "childrenImageSharp___fluid___presentationWidth",
  ChildrenImageSharpFluidSizes = "childrenImageSharp___fluid___sizes",
  ChildrenImageSharpFluidSrc = "childrenImageSharp___fluid___src",
  ChildrenImageSharpFluidSrcSet = "childrenImageSharp___fluid___srcSet",
  ChildrenImageSharpFluidSrcSetWebp = "childrenImageSharp___fluid___srcSetWebp",
  ChildrenImageSharpFluidSrcWebp = "childrenImageSharp___fluid___srcWebp",
  ChildrenImageSharpFluidTracedSvg = "childrenImageSharp___fluid___tracedSVG",
  ChildrenImageSharpGatsbyImageData = "childrenImageSharp___gatsbyImageData",
  ChildrenImageSharpId = "childrenImageSharp___id",
  ChildrenImageSharpInternalContent = "childrenImageSharp___internal___content",
  ChildrenImageSharpInternalContentDigest = "childrenImageSharp___internal___contentDigest",
  ChildrenImageSharpInternalDescription = "childrenImageSharp___internal___description",
  ChildrenImageSharpInternalFieldOwners = "childrenImageSharp___internal___fieldOwners",
  ChildrenImageSharpInternalIgnoreType = "childrenImageSharp___internal___ignoreType",
  ChildrenImageSharpInternalMediaType = "childrenImageSharp___internal___mediaType",
  ChildrenImageSharpInternalOwner = "childrenImageSharp___internal___owner",
  ChildrenImageSharpInternalType = "childrenImageSharp___internal___type",
  ChildrenImageSharpOriginalHeight = "childrenImageSharp___original___height",
  ChildrenImageSharpOriginalSrc = "childrenImageSharp___original___src",
  ChildrenImageSharpOriginalWidth = "childrenImageSharp___original___width",
  ChildrenImageSharpParentChildren = "childrenImageSharp___parent___children",
  ChildrenImageSharpParentChildrenChildren = "childrenImageSharp___parent___children___children",
  ChildrenImageSharpParentChildrenId = "childrenImageSharp___parent___children___id",
  ChildrenImageSharpParentId = "childrenImageSharp___parent___id",
  ChildrenImageSharpParentInternalContent = "childrenImageSharp___parent___internal___content",
  ChildrenImageSharpParentInternalContentDigest = "childrenImageSharp___parent___internal___contentDigest",
  ChildrenImageSharpParentInternalDescription = "childrenImageSharp___parent___internal___description",
  ChildrenImageSharpParentInternalFieldOwners = "childrenImageSharp___parent___internal___fieldOwners",
  ChildrenImageSharpParentInternalIgnoreType = "childrenImageSharp___parent___internal___ignoreType",
  ChildrenImageSharpParentInternalMediaType = "childrenImageSharp___parent___internal___mediaType",
  ChildrenImageSharpParentInternalOwner = "childrenImageSharp___parent___internal___owner",
  ChildrenImageSharpParentInternalType = "childrenImageSharp___parent___internal___type",
  ChildrenImageSharpParentParentChildren = "childrenImageSharp___parent___parent___children",
  ChildrenImageSharpParentParentId = "childrenImageSharp___parent___parent___id",
  ChildrenImageSharpResizeAspectRatio = "childrenImageSharp___resize___aspectRatio",
  ChildrenImageSharpResizeHeight = "childrenImageSharp___resize___height",
  ChildrenImageSharpResizeOriginalName = "childrenImageSharp___resize___originalName",
  ChildrenImageSharpResizeSrc = "childrenImageSharp___resize___src",
  ChildrenImageSharpResizeTracedSvg = "childrenImageSharp___resize___tracedSVG",
  ChildrenImageSharpResizeWidth = "childrenImageSharp___resize___width",
  ChildrenMarkdownRemark = "childrenMarkdownRemark",
  ChildrenMarkdownRemarkChildren = "childrenMarkdownRemark___children",
  ChildrenMarkdownRemarkChildrenChildren = "childrenMarkdownRemark___children___children",
  ChildrenMarkdownRemarkChildrenChildrenChildren = "childrenMarkdownRemark___children___children___children",
  ChildrenMarkdownRemarkChildrenChildrenId = "childrenMarkdownRemark___children___children___id",
  ChildrenMarkdownRemarkChildrenId = "childrenMarkdownRemark___children___id",
  ChildrenMarkdownRemarkChildrenInternalContent = "childrenMarkdownRemark___children___internal___content",
  ChildrenMarkdownRemarkChildrenInternalContentDigest = "childrenMarkdownRemark___children___internal___contentDigest",
  ChildrenMarkdownRemarkChildrenInternalDescription = "childrenMarkdownRemark___children___internal___description",
  ChildrenMarkdownRemarkChildrenInternalFieldOwners = "childrenMarkdownRemark___children___internal___fieldOwners",
  ChildrenMarkdownRemarkChildrenInternalIgnoreType = "childrenMarkdownRemark___children___internal___ignoreType",
  ChildrenMarkdownRemarkChildrenInternalMediaType = "childrenMarkdownRemark___children___internal___mediaType",
  ChildrenMarkdownRemarkChildrenInternalOwner = "childrenMarkdownRemark___children___internal___owner",
  ChildrenMarkdownRemarkChildrenInternalType = "childrenMarkdownRemark___children___internal___type",
  ChildrenMarkdownRemarkChildrenParentChildren = "childrenMarkdownRemark___children___parent___children",
  ChildrenMarkdownRemarkChildrenParentId = "childrenMarkdownRemark___children___parent___id",
  ChildrenMarkdownRemarkExcerpt = "childrenMarkdownRemark___excerpt",
  ChildrenMarkdownRemarkExcerptAst = "childrenMarkdownRemark___excerptAst",
  ChildrenMarkdownRemarkFieldsSlug = "childrenMarkdownRemark___fields___slug",
  ChildrenMarkdownRemarkFileAbsolutePath = "childrenMarkdownRemark___fileAbsolutePath",
  ChildrenMarkdownRemarkFrontmatterAuthor = "childrenMarkdownRemark___frontmatter___author",
  ChildrenMarkdownRemarkFrontmatterCategories = "childrenMarkdownRemark___frontmatter___categories",
  ChildrenMarkdownRemarkFrontmatterDate = "childrenMarkdownRemark___frontmatter___date",
  ChildrenMarkdownRemarkFrontmatterExcerpt = "childrenMarkdownRemark___frontmatter___excerpt",
  ChildrenMarkdownRemarkFrontmatterHero = "childrenMarkdownRemark___frontmatter___hero",
  ChildrenMarkdownRemarkFrontmatterLang = "childrenMarkdownRemark___frontmatter___lang",
  ChildrenMarkdownRemarkFrontmatterTitle = "childrenMarkdownRemark___frontmatter___title",
  ChildrenMarkdownRemarkFrontmatterType = "childrenMarkdownRemark___frontmatter___type",
  ChildrenMarkdownRemarkHeadings = "childrenMarkdownRemark___headings",
  ChildrenMarkdownRemarkHeadingsDepth = "childrenMarkdownRemark___headings___depth",
  ChildrenMarkdownRemarkHeadingsId = "childrenMarkdownRemark___headings___id",
  ChildrenMarkdownRemarkHeadingsValue = "childrenMarkdownRemark___headings___value",
  ChildrenMarkdownRemarkHeroAbsolutePath = "childrenMarkdownRemark___hero___absolutePath",
  ChildrenMarkdownRemarkHeroAccessTime = "childrenMarkdownRemark___hero___accessTime",
  ChildrenMarkdownRemarkHeroAtime = "childrenMarkdownRemark___hero___atime",
  ChildrenMarkdownRemarkHeroAtimeMs = "childrenMarkdownRemark___hero___atimeMs",
  ChildrenMarkdownRemarkHeroBase = "childrenMarkdownRemark___hero___base",
  ChildrenMarkdownRemarkHeroBirthTime = "childrenMarkdownRemark___hero___birthTime",
  ChildrenMarkdownRemarkHeroBirthtime = "childrenMarkdownRemark___hero___birthtime",
  ChildrenMarkdownRemarkHeroBirthtimeMs = "childrenMarkdownRemark___hero___birthtimeMs",
  ChildrenMarkdownRemarkHeroBlksize = "childrenMarkdownRemark___hero___blksize",
  ChildrenMarkdownRemarkHeroBlocks = "childrenMarkdownRemark___hero___blocks",
  ChildrenMarkdownRemarkHeroChangeTime = "childrenMarkdownRemark___hero___changeTime",
  ChildrenMarkdownRemarkHeroChildImageSharpChildren = "childrenMarkdownRemark___hero___childImageSharp___children",
  ChildrenMarkdownRemarkHeroChildImageSharpGatsbyImageData = "childrenMarkdownRemark___hero___childImageSharp___gatsbyImageData",
  ChildrenMarkdownRemarkHeroChildImageSharpId = "childrenMarkdownRemark___hero___childImageSharp___id",
  ChildrenMarkdownRemarkHeroChildMarkdownRemarkChildren = "childrenMarkdownRemark___hero___childMarkdownRemark___children",
  ChildrenMarkdownRemarkHeroChildMarkdownRemarkExcerpt = "childrenMarkdownRemark___hero___childMarkdownRemark___excerpt",
  ChildrenMarkdownRemarkHeroChildMarkdownRemarkExcerptAst = "childrenMarkdownRemark___hero___childMarkdownRemark___excerptAst",
  ChildrenMarkdownRemarkHeroChildMarkdownRemarkFileAbsolutePath = "childrenMarkdownRemark___hero___childMarkdownRemark___fileAbsolutePath",
  ChildrenMarkdownRemarkHeroChildMarkdownRemarkHeadings = "childrenMarkdownRemark___hero___childMarkdownRemark___headings",
  ChildrenMarkdownRemarkHeroChildMarkdownRemarkHtml = "childrenMarkdownRemark___hero___childMarkdownRemark___html",
  ChildrenMarkdownRemarkHeroChildMarkdownRemarkHtmlAst = "childrenMarkdownRemark___hero___childMarkdownRemark___htmlAst",
  ChildrenMarkdownRemarkHeroChildMarkdownRemarkId = "childrenMarkdownRemark___hero___childMarkdownRemark___id",
  ChildrenMarkdownRemarkHeroChildMarkdownRemarkRawMarkdownBody = "childrenMarkdownRemark___hero___childMarkdownRemark___rawMarkdownBody",
  ChildrenMarkdownRemarkHeroChildMarkdownRemarkTableOfContents = "childrenMarkdownRemark___hero___childMarkdownRemark___tableOfContents",
  ChildrenMarkdownRemarkHeroChildMarkdownRemarkTimeToRead = "childrenMarkdownRemark___hero___childMarkdownRemark___timeToRead",
  ChildrenMarkdownRemarkHeroChildren = "childrenMarkdownRemark___hero___children",
  ChildrenMarkdownRemarkHeroChildrenImageSharp = "childrenMarkdownRemark___hero___childrenImageSharp",
  ChildrenMarkdownRemarkHeroChildrenImageSharpChildren = "childrenMarkdownRemark___hero___childrenImageSharp___children",
  ChildrenMarkdownRemarkHeroChildrenImageSharpGatsbyImageData = "childrenMarkdownRemark___hero___childrenImageSharp___gatsbyImageData",
  ChildrenMarkdownRemarkHeroChildrenImageSharpId = "childrenMarkdownRemark___hero___childrenImageSharp___id",
  ChildrenMarkdownRemarkHeroChildrenMarkdownRemark = "childrenMarkdownRemark___hero___childrenMarkdownRemark",
  ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkChildren = "childrenMarkdownRemark___hero___childrenMarkdownRemark___children",
  ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkExcerpt = "childrenMarkdownRemark___hero___childrenMarkdownRemark___excerpt",
  ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkExcerptAst = "childrenMarkdownRemark___hero___childrenMarkdownRemark___excerptAst",
  ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkFileAbsolutePath = "childrenMarkdownRemark___hero___childrenMarkdownRemark___fileAbsolutePath",
  ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkHeadings = "childrenMarkdownRemark___hero___childrenMarkdownRemark___headings",
  ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkHtml = "childrenMarkdownRemark___hero___childrenMarkdownRemark___html",
  ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkHtmlAst = "childrenMarkdownRemark___hero___childrenMarkdownRemark___htmlAst",
  ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkId = "childrenMarkdownRemark___hero___childrenMarkdownRemark___id",
  ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkRawMarkdownBody = "childrenMarkdownRemark___hero___childrenMarkdownRemark___rawMarkdownBody",
  ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkTableOfContents = "childrenMarkdownRemark___hero___childrenMarkdownRemark___tableOfContents",
  ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkTimeToRead = "childrenMarkdownRemark___hero___childrenMarkdownRemark___timeToRead",
  ChildrenMarkdownRemarkHeroChildrenChildren = "childrenMarkdownRemark___hero___children___children",
  ChildrenMarkdownRemarkHeroChildrenId = "childrenMarkdownRemark___hero___children___id",
  ChildrenMarkdownRemarkHeroCtime = "childrenMarkdownRemark___hero___ctime",
  ChildrenMarkdownRemarkHeroCtimeMs = "childrenMarkdownRemark___hero___ctimeMs",
  ChildrenMarkdownRemarkHeroDev = "childrenMarkdownRemark___hero___dev",
  ChildrenMarkdownRemarkHeroDir = "childrenMarkdownRemark___hero___dir",
  ChildrenMarkdownRemarkHeroExt = "childrenMarkdownRemark___hero___ext",
  ChildrenMarkdownRemarkHeroExtension = "childrenMarkdownRemark___hero___extension",
  ChildrenMarkdownRemarkHeroGid = "childrenMarkdownRemark___hero___gid",
  ChildrenMarkdownRemarkHeroId = "childrenMarkdownRemark___hero___id",
  ChildrenMarkdownRemarkHeroIno = "childrenMarkdownRemark___hero___ino",
  ChildrenMarkdownRemarkHeroInternalContent = "childrenMarkdownRemark___hero___internal___content",
  ChildrenMarkdownRemarkHeroInternalContentDigest = "childrenMarkdownRemark___hero___internal___contentDigest",
  ChildrenMarkdownRemarkHeroInternalDescription = "childrenMarkdownRemark___hero___internal___description",
  ChildrenMarkdownRemarkHeroInternalFieldOwners = "childrenMarkdownRemark___hero___internal___fieldOwners",
  ChildrenMarkdownRemarkHeroInternalIgnoreType = "childrenMarkdownRemark___hero___internal___ignoreType",
  ChildrenMarkdownRemarkHeroInternalMediaType = "childrenMarkdownRemark___hero___internal___mediaType",
  ChildrenMarkdownRemarkHeroInternalOwner = "childrenMarkdownRemark___hero___internal___owner",
  ChildrenMarkdownRemarkHeroInternalType = "childrenMarkdownRemark___hero___internal___type",
  ChildrenMarkdownRemarkHeroMode = "childrenMarkdownRemark___hero___mode",
  ChildrenMarkdownRemarkHeroModifiedTime = "childrenMarkdownRemark___hero___modifiedTime",
  ChildrenMarkdownRemarkHeroMtime = "childrenMarkdownRemark___hero___mtime",
  ChildrenMarkdownRemarkHeroMtimeMs = "childrenMarkdownRemark___hero___mtimeMs",
  ChildrenMarkdownRemarkHeroName = "childrenMarkdownRemark___hero___name",
  ChildrenMarkdownRemarkHeroNlink = "childrenMarkdownRemark___hero___nlink",
  ChildrenMarkdownRemarkHeroParentChildren = "childrenMarkdownRemark___hero___parent___children",
  ChildrenMarkdownRemarkHeroParentId = "childrenMarkdownRemark___hero___parent___id",
  ChildrenMarkdownRemarkHeroPrettySize = "childrenMarkdownRemark___hero___prettySize",
  ChildrenMarkdownRemarkHeroPublicUrl = "childrenMarkdownRemark___hero___publicURL",
  ChildrenMarkdownRemarkHeroRdev = "childrenMarkdownRemark___hero___rdev",
  ChildrenMarkdownRemarkHeroRelativeDirectory = "childrenMarkdownRemark___hero___relativeDirectory",
  ChildrenMarkdownRemarkHeroRelativePath = "childrenMarkdownRemark___hero___relativePath",
  ChildrenMarkdownRemarkHeroRoot = "childrenMarkdownRemark___hero___root",
  ChildrenMarkdownRemarkHeroSize = "childrenMarkdownRemark___hero___size",
  ChildrenMarkdownRemarkHeroSourceInstanceName = "childrenMarkdownRemark___hero___sourceInstanceName",
  ChildrenMarkdownRemarkHeroUid = "childrenMarkdownRemark___hero___uid",
  ChildrenMarkdownRemarkHeroUrl = "childrenMarkdownRemark___hero___url",
  ChildrenMarkdownRemarkHtml = "childrenMarkdownRemark___html",
  ChildrenMarkdownRemarkHtmlAst = "childrenMarkdownRemark___htmlAst",
  ChildrenMarkdownRemarkId = "childrenMarkdownRemark___id",
  ChildrenMarkdownRemarkInternalContent = "childrenMarkdownRemark___internal___content",
  ChildrenMarkdownRemarkInternalContentDigest = "childrenMarkdownRemark___internal___contentDigest",
  ChildrenMarkdownRemarkInternalDescription = "childrenMarkdownRemark___internal___description",
  ChildrenMarkdownRemarkInternalFieldOwners = "childrenMarkdownRemark___internal___fieldOwners",
  ChildrenMarkdownRemarkInternalIgnoreType = "childrenMarkdownRemark___internal___ignoreType",
  ChildrenMarkdownRemarkInternalMediaType = "childrenMarkdownRemark___internal___mediaType",
  ChildrenMarkdownRemarkInternalOwner = "childrenMarkdownRemark___internal___owner",
  ChildrenMarkdownRemarkInternalType = "childrenMarkdownRemark___internal___type",
  ChildrenMarkdownRemarkParentChildren = "childrenMarkdownRemark___parent___children",
  ChildrenMarkdownRemarkParentChildrenChildren = "childrenMarkdownRemark___parent___children___children",
  ChildrenMarkdownRemarkParentChildrenId = "childrenMarkdownRemark___parent___children___id",
  ChildrenMarkdownRemarkParentId = "childrenMarkdownRemark___parent___id",
  ChildrenMarkdownRemarkParentInternalContent = "childrenMarkdownRemark___parent___internal___content",
  ChildrenMarkdownRemarkParentInternalContentDigest = "childrenMarkdownRemark___parent___internal___contentDigest",
  ChildrenMarkdownRemarkParentInternalDescription = "childrenMarkdownRemark___parent___internal___description",
  ChildrenMarkdownRemarkParentInternalFieldOwners = "childrenMarkdownRemark___parent___internal___fieldOwners",
  ChildrenMarkdownRemarkParentInternalIgnoreType = "childrenMarkdownRemark___parent___internal___ignoreType",
  ChildrenMarkdownRemarkParentInternalMediaType = "childrenMarkdownRemark___parent___internal___mediaType",
  ChildrenMarkdownRemarkParentInternalOwner = "childrenMarkdownRemark___parent___internal___owner",
  ChildrenMarkdownRemarkParentInternalType = "childrenMarkdownRemark___parent___internal___type",
  ChildrenMarkdownRemarkParentParentChildren = "childrenMarkdownRemark___parent___parent___children",
  ChildrenMarkdownRemarkParentParentId = "childrenMarkdownRemark___parent___parent___id",
  ChildrenMarkdownRemarkRawMarkdownBody = "childrenMarkdownRemark___rawMarkdownBody",
  ChildrenMarkdownRemarkTableOfContents = "childrenMarkdownRemark___tableOfContents",
  ChildrenMarkdownRemarkTimeToRead = "childrenMarkdownRemark___timeToRead",
  ChildrenMarkdownRemarkWordCountParagraphs = "childrenMarkdownRemark___wordCount___paragraphs",
  ChildrenMarkdownRemarkWordCountSentences = "childrenMarkdownRemark___wordCount___sentences",
  ChildrenMarkdownRemarkWordCountWords = "childrenMarkdownRemark___wordCount___words",
  ChildrenChildren = "children___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenId = "children___id",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentParentId = "children___parent___parent___id",
  Ctime = "ctime",
  CtimeMs = "ctimeMs",
  Dev = "dev",
  Dir = "dir",
  Ext = "ext",
  Extension = "extension",
  Gid = "gid",
  Id = "id",
  Ino = "ino",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
  Mode = "mode",
  ModifiedTime = "modifiedTime",
  Mtime = "mtime",
  MtimeMs = "mtimeMs",
  Name = "name",
  Nlink = "nlink",
  ParentChildren = "parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenId = "parent___children___id",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentId = "parent___id",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentId = "parent___parent___id",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentParentId = "parent___parent___parent___id",
  PrettySize = "prettySize",
  PublicUrl = "publicURL",
  Rdev = "rdev",
  RelativeDirectory = "relativeDirectory",
  RelativePath = "relativePath",
  Root = "root",
  Size = "size",
  SourceInstanceName = "sourceInstanceName",
  Uid = "uid",
  Url = "url",
}

export type FileFilterInput = {
  readonly absolutePath: Maybe<StringQueryOperatorInput>;
  readonly accessTime: Maybe<DateQueryOperatorInput>;
  readonly atime: Maybe<DateQueryOperatorInput>;
  readonly atimeMs: Maybe<FloatQueryOperatorInput>;
  readonly base: Maybe<StringQueryOperatorInput>;
  readonly birthTime: Maybe<DateQueryOperatorInput>;
  readonly birthtime: Maybe<DateQueryOperatorInput>;
  readonly birthtimeMs: Maybe<FloatQueryOperatorInput>;
  readonly blksize: Maybe<IntQueryOperatorInput>;
  readonly blocks: Maybe<IntQueryOperatorInput>;
  readonly changeTime: Maybe<DateQueryOperatorInput>;
  readonly childImageSharp: Maybe<ImageSharpFilterInput>;
  readonly childMarkdownRemark: Maybe<MarkdownRemarkFilterInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly childrenImageSharp: Maybe<ImageSharpFilterListInput>;
  readonly childrenMarkdownRemark: Maybe<MarkdownRemarkFilterListInput>;
  readonly ctime: Maybe<DateQueryOperatorInput>;
  readonly ctimeMs: Maybe<FloatQueryOperatorInput>;
  readonly dev: Maybe<IntQueryOperatorInput>;
  readonly dir: Maybe<StringQueryOperatorInput>;
  readonly ext: Maybe<StringQueryOperatorInput>;
  readonly extension: Maybe<StringQueryOperatorInput>;
  readonly gid: Maybe<IntQueryOperatorInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly ino: Maybe<FloatQueryOperatorInput>;
  readonly internal: Maybe<InternalFilterInput>;
  readonly mode: Maybe<IntQueryOperatorInput>;
  readonly modifiedTime: Maybe<DateQueryOperatorInput>;
  readonly mtime: Maybe<DateQueryOperatorInput>;
  readonly mtimeMs: Maybe<FloatQueryOperatorInput>;
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly nlink: Maybe<IntQueryOperatorInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly prettySize: Maybe<StringQueryOperatorInput>;
  readonly publicURL: Maybe<StringQueryOperatorInput>;
  readonly rdev: Maybe<IntQueryOperatorInput>;
  readonly relativeDirectory: Maybe<StringQueryOperatorInput>;
  readonly relativePath: Maybe<StringQueryOperatorInput>;
  readonly root: Maybe<StringQueryOperatorInput>;
  readonly size: Maybe<IntQueryOperatorInput>;
  readonly sourceInstanceName: Maybe<StringQueryOperatorInput>;
  readonly uid: Maybe<IntQueryOperatorInput>;
  readonly url: Maybe<StringQueryOperatorInput>;
};

export type FileGroupConnection = {
  readonly __typename?: "FileGroupConnection";
  readonly edges: ReadonlyArray<FileEdge>;
  readonly field: Scalars["String"];
  readonly fieldValue: Maybe<Scalars["String"]>;
  readonly nodes: ReadonlyArray<File>;
  readonly pageInfo: PageInfo;
  readonly totalCount: Scalars["Int"];
};

export type FileSortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<FileFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};

export type FloatQueryOperatorInput = {
  readonly eq: Maybe<Scalars["Float"]>;
  readonly gt: Maybe<Scalars["Float"]>;
  readonly gte: Maybe<Scalars["Float"]>;
  readonly in: Maybe<ReadonlyArray<Maybe<Scalars["Float"]>>>;
  readonly lt: Maybe<Scalars["Float"]>;
  readonly lte: Maybe<Scalars["Float"]>;
  readonly ne: Maybe<Scalars["Float"]>;
  readonly nin: Maybe<ReadonlyArray<Maybe<Scalars["Float"]>>>;
};

export enum ImageCropFocus {
  Attention = "ATTENTION",
  Center = "CENTER",
  East = "EAST",
  Entropy = "ENTROPY",
  North = "NORTH",
  Northeast = "NORTHEAST",
  Northwest = "NORTHWEST",
  South = "SOUTH",
  Southeast = "SOUTHEAST",
  Southwest = "SOUTHWEST",
  West = "WEST",
}

export enum ImageFit {
  Contain = "CONTAIN",
  Cover = "COVER",
  Fill = "FILL",
  Inside = "INSIDE",
  Outside = "OUTSIDE",
}

export enum ImageFormat {
  Auto = "AUTO",
  Avif = "AVIF",
  Jpg = "JPG",
  NoChange = "NO_CHANGE",
  Png = "PNG",
  Webp = "WEBP",
}

export enum ImageLayout {
  Constrained = "CONSTRAINED",
  Fixed = "FIXED",
  FullWidth = "FULL_WIDTH",
}

export enum ImagePlaceholder {
  Blurred = "BLURRED",
  DominantColor = "DOMINANT_COLOR",
  None = "NONE",
  TracedSvg = "TRACED_SVG",
}

export type ImageSharp = Node & {
  readonly __typename?: "ImageSharp";
  readonly children: ReadonlyArray<Node>;
  readonly fixed: Maybe<ImageSharpFixed>;
  readonly fluid: Maybe<ImageSharpFluid>;
  readonly gatsbyImageData: Scalars["JSON"];
  readonly id: Scalars["ID"];
  readonly internal: Internal;
  readonly original: Maybe<ImageSharpOriginal>;
  readonly parent: Maybe<Node>;
  readonly resize: Maybe<ImageSharpResize>;
};

export type ImageSharpFixedArgs = {
  background?: Maybe<Scalars["String"]>;
  base64Width: Maybe<Scalars["Int"]>;
  cropFocus?: Maybe<ImageCropFocus>;
  duotone: Maybe<DuotoneGradient>;
  fit?: Maybe<ImageFit>;
  grayscale?: Maybe<Scalars["Boolean"]>;
  height: Maybe<Scalars["Int"]>;
  jpegProgressive?: Maybe<Scalars["Boolean"]>;
  jpegQuality: Maybe<Scalars["Int"]>;
  pngCompressionSpeed?: Maybe<Scalars["Int"]>;
  pngQuality: Maybe<Scalars["Int"]>;
  quality: Maybe<Scalars["Int"]>;
  rotate?: Maybe<Scalars["Int"]>;
  toFormat?: Maybe<ImageFormat>;
  toFormatBase64?: Maybe<ImageFormat>;
  traceSVG: Maybe<Potrace>;
  trim?: Maybe<Scalars["Float"]>;
  webpQuality: Maybe<Scalars["Int"]>;
  width: Maybe<Scalars["Int"]>;
};

export type ImageSharpFluidArgs = {
  background?: Maybe<Scalars["String"]>;
  base64Width: Maybe<Scalars["Int"]>;
  cropFocus?: Maybe<ImageCropFocus>;
  duotone: Maybe<DuotoneGradient>;
  fit?: Maybe<ImageFit>;
  grayscale?: Maybe<Scalars["Boolean"]>;
  jpegProgressive?: Maybe<Scalars["Boolean"]>;
  jpegQuality: Maybe<Scalars["Int"]>;
  maxHeight: Maybe<Scalars["Int"]>;
  maxWidth: Maybe<Scalars["Int"]>;
  pngCompressionSpeed?: Maybe<Scalars["Int"]>;
  pngQuality: Maybe<Scalars["Int"]>;
  quality: Maybe<Scalars["Int"]>;
  rotate?: Maybe<Scalars["Int"]>;
  sizes?: Maybe<Scalars["String"]>;
  srcSetBreakpoints?: Maybe<ReadonlyArray<Maybe<Scalars["Int"]>>>;
  toFormat?: Maybe<ImageFormat>;
  toFormatBase64?: Maybe<ImageFormat>;
  traceSVG: Maybe<Potrace>;
  trim?: Maybe<Scalars["Float"]>;
  webpQuality: Maybe<Scalars["Int"]>;
};

export type ImageSharpGatsbyImageDataArgs = {
  aspectRatio: Maybe<Scalars["Float"]>;
  avifOptions: Maybe<AvifOptions>;
  backgroundColor: Maybe<Scalars["String"]>;
  blurredOptions: Maybe<BlurredOptions>;
  breakpoints: Maybe<ReadonlyArray<Maybe<Scalars["Int"]>>>;
  formats: Maybe<ReadonlyArray<Maybe<ImageFormat>>>;
  height: Maybe<Scalars["Int"]>;
  jpgOptions: Maybe<JpgOptions>;
  layout?: Maybe<ImageLayout>;
  outputPixelDensities: Maybe<ReadonlyArray<Maybe<Scalars["Float"]>>>;
  placeholder: Maybe<ImagePlaceholder>;
  pngOptions: Maybe<PngOptions>;
  quality: Maybe<Scalars["Int"]>;
  sizes: Maybe<Scalars["String"]>;
  tracedSVGOptions: Maybe<Potrace>;
  transformOptions: Maybe<TransformOptions>;
  webpOptions: Maybe<WebPOptions>;
  width: Maybe<Scalars["Int"]>;
};

export type ImageSharpResizeArgs = {
  background?: Maybe<Scalars["String"]>;
  base64?: Maybe<Scalars["Boolean"]>;
  cropFocus?: Maybe<ImageCropFocus>;
  duotone: Maybe<DuotoneGradient>;
  fit?: Maybe<ImageFit>;
  grayscale?: Maybe<Scalars["Boolean"]>;
  height: Maybe<Scalars["Int"]>;
  jpegProgressive?: Maybe<Scalars["Boolean"]>;
  jpegQuality: Maybe<Scalars["Int"]>;
  pngCompressionLevel?: Maybe<Scalars["Int"]>;
  pngCompressionSpeed?: Maybe<Scalars["Int"]>;
  pngQuality: Maybe<Scalars["Int"]>;
  quality: Maybe<Scalars["Int"]>;
  rotate?: Maybe<Scalars["Int"]>;
  toFormat?: Maybe<ImageFormat>;
  traceSVG: Maybe<Potrace>;
  trim?: Maybe<Scalars["Float"]>;
  webpQuality: Maybe<Scalars["Int"]>;
  width: Maybe<Scalars["Int"]>;
};

export type ImageSharpConnection = {
  readonly __typename?: "ImageSharpConnection";
  readonly distinct: ReadonlyArray<Scalars["String"]>;
  readonly edges: ReadonlyArray<ImageSharpEdge>;
  readonly group: ReadonlyArray<ImageSharpGroupConnection>;
  readonly max: Maybe<Scalars["Float"]>;
  readonly min: Maybe<Scalars["Float"]>;
  readonly nodes: ReadonlyArray<ImageSharp>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars["Float"]>;
  readonly totalCount: Scalars["Int"];
};

export type ImageSharpConnectionDistinctArgs = {
  field: ImageSharpFieldsEnum;
};

export type ImageSharpConnectionGroupArgs = {
  field: ImageSharpFieldsEnum;
  limit: Maybe<Scalars["Int"]>;
  skip: Maybe<Scalars["Int"]>;
};

export type ImageSharpConnectionMaxArgs = {
  field: ImageSharpFieldsEnum;
};

export type ImageSharpConnectionMinArgs = {
  field: ImageSharpFieldsEnum;
};

export type ImageSharpConnectionSumArgs = {
  field: ImageSharpFieldsEnum;
};

export type ImageSharpEdge = {
  readonly __typename?: "ImageSharpEdge";
  readonly next: Maybe<ImageSharp>;
  readonly node: ImageSharp;
  readonly previous: Maybe<ImageSharp>;
};

export enum ImageSharpFieldsEnum {
  Children = "children",
  ChildrenChildren = "children___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenId = "children___id",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentParentId = "children___parent___parent___id",
  FixedAspectRatio = "fixed___aspectRatio",
  FixedBase64 = "fixed___base64",
  FixedHeight = "fixed___height",
  FixedOriginalName = "fixed___originalName",
  FixedSrc = "fixed___src",
  FixedSrcSet = "fixed___srcSet",
  FixedSrcSetWebp = "fixed___srcSetWebp",
  FixedSrcWebp = "fixed___srcWebp",
  FixedTracedSvg = "fixed___tracedSVG",
  FixedWidth = "fixed___width",
  FluidAspectRatio = "fluid___aspectRatio",
  FluidBase64 = "fluid___base64",
  FluidOriginalImg = "fluid___originalImg",
  FluidOriginalName = "fluid___originalName",
  FluidPresentationHeight = "fluid___presentationHeight",
  FluidPresentationWidth = "fluid___presentationWidth",
  FluidSizes = "fluid___sizes",
  FluidSrc = "fluid___src",
  FluidSrcSet = "fluid___srcSet",
  FluidSrcSetWebp = "fluid___srcSetWebp",
  FluidSrcWebp = "fluid___srcWebp",
  FluidTracedSvg = "fluid___tracedSVG",
  GatsbyImageData = "gatsbyImageData",
  Id = "id",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
  OriginalHeight = "original___height",
  OriginalSrc = "original___src",
  OriginalWidth = "original___width",
  ParentChildren = "parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenId = "parent___children___id",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentId = "parent___id",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentId = "parent___parent___id",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentParentId = "parent___parent___parent___id",
  ResizeAspectRatio = "resize___aspectRatio",
  ResizeHeight = "resize___height",
  ResizeOriginalName = "resize___originalName",
  ResizeSrc = "resize___src",
  ResizeTracedSvg = "resize___tracedSVG",
  ResizeWidth = "resize___width",
}

export type ImageSharpFilterInput = {
  readonly children: Maybe<NodeFilterListInput>;
  readonly fixed: Maybe<ImageSharpFixedFilterInput>;
  readonly fluid: Maybe<ImageSharpFluidFilterInput>;
  readonly gatsbyImageData: Maybe<JsonQueryOperatorInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly internal: Maybe<InternalFilterInput>;
  readonly original: Maybe<ImageSharpOriginalFilterInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly resize: Maybe<ImageSharpResizeFilterInput>;
};

export type ImageSharpFilterListInput = {
  readonly elemMatch: Maybe<ImageSharpFilterInput>;
};

export type ImageSharpFixed = {
  readonly __typename?: "ImageSharpFixed";
  readonly aspectRatio: Maybe<Scalars["Float"]>;
  readonly base64: Maybe<Scalars["String"]>;
  readonly height: Scalars["Float"];
  readonly originalName: Maybe<Scalars["String"]>;
  readonly src: Scalars["String"];
  readonly srcSet: Scalars["String"];
  readonly srcSetWebp: Maybe<Scalars["String"]>;
  readonly srcWebp: Maybe<Scalars["String"]>;
  readonly tracedSVG: Maybe<Scalars["String"]>;
  readonly width: Scalars["Float"];
};

export type ImageSharpFixedFilterInput = {
  readonly aspectRatio: Maybe<FloatQueryOperatorInput>;
  readonly base64: Maybe<StringQueryOperatorInput>;
  readonly height: Maybe<FloatQueryOperatorInput>;
  readonly originalName: Maybe<StringQueryOperatorInput>;
  readonly src: Maybe<StringQueryOperatorInput>;
  readonly srcSet: Maybe<StringQueryOperatorInput>;
  readonly srcSetWebp: Maybe<StringQueryOperatorInput>;
  readonly srcWebp: Maybe<StringQueryOperatorInput>;
  readonly tracedSVG: Maybe<StringQueryOperatorInput>;
  readonly width: Maybe<FloatQueryOperatorInput>;
};

export type ImageSharpFluid = {
  readonly __typename?: "ImageSharpFluid";
  readonly aspectRatio: Scalars["Float"];
  readonly base64: Maybe<Scalars["String"]>;
  readonly originalImg: Maybe<Scalars["String"]>;
  readonly originalName: Maybe<Scalars["String"]>;
  readonly presentationHeight: Scalars["Int"];
  readonly presentationWidth: Scalars["Int"];
  readonly sizes: Scalars["String"];
  readonly src: Scalars["String"];
  readonly srcSet: Scalars["String"];
  readonly srcSetWebp: Maybe<Scalars["String"]>;
  readonly srcWebp: Maybe<Scalars["String"]>;
  readonly tracedSVG: Maybe<Scalars["String"]>;
};

export type ImageSharpFluidFilterInput = {
  readonly aspectRatio: Maybe<FloatQueryOperatorInput>;
  readonly base64: Maybe<StringQueryOperatorInput>;
  readonly originalImg: Maybe<StringQueryOperatorInput>;
  readonly originalName: Maybe<StringQueryOperatorInput>;
  readonly presentationHeight: Maybe<IntQueryOperatorInput>;
  readonly presentationWidth: Maybe<IntQueryOperatorInput>;
  readonly sizes: Maybe<StringQueryOperatorInput>;
  readonly src: Maybe<StringQueryOperatorInput>;
  readonly srcSet: Maybe<StringQueryOperatorInput>;
  readonly srcSetWebp: Maybe<StringQueryOperatorInput>;
  readonly srcWebp: Maybe<StringQueryOperatorInput>;
  readonly tracedSVG: Maybe<StringQueryOperatorInput>;
};

export type ImageSharpGroupConnection = {
  readonly __typename?: "ImageSharpGroupConnection";
  readonly edges: ReadonlyArray<ImageSharpEdge>;
  readonly field: Scalars["String"];
  readonly fieldValue: Maybe<Scalars["String"]>;
  readonly nodes: ReadonlyArray<ImageSharp>;
  readonly pageInfo: PageInfo;
  readonly totalCount: Scalars["Int"];
};

export type ImageSharpOriginal = {
  readonly __typename?: "ImageSharpOriginal";
  readonly height: Maybe<Scalars["Float"]>;
  readonly src: Maybe<Scalars["String"]>;
  readonly width: Maybe<Scalars["Float"]>;
};

export type ImageSharpOriginalFilterInput = {
  readonly height: Maybe<FloatQueryOperatorInput>;
  readonly src: Maybe<StringQueryOperatorInput>;
  readonly width: Maybe<FloatQueryOperatorInput>;
};

export type ImageSharpResize = {
  readonly __typename?: "ImageSharpResize";
  readonly aspectRatio: Maybe<Scalars["Float"]>;
  readonly height: Maybe<Scalars["Int"]>;
  readonly originalName: Maybe<Scalars["String"]>;
  readonly src: Maybe<Scalars["String"]>;
  readonly tracedSVG: Maybe<Scalars["String"]>;
  readonly width: Maybe<Scalars["Int"]>;
};

export type ImageSharpResizeFilterInput = {
  readonly aspectRatio: Maybe<FloatQueryOperatorInput>;
  readonly height: Maybe<IntQueryOperatorInput>;
  readonly originalName: Maybe<StringQueryOperatorInput>;
  readonly src: Maybe<StringQueryOperatorInput>;
  readonly tracedSVG: Maybe<StringQueryOperatorInput>;
  readonly width: Maybe<IntQueryOperatorInput>;
};

export type ImageSharpSortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<ImageSharpFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};

export type IntQueryOperatorInput = {
  readonly eq: Maybe<Scalars["Int"]>;
  readonly gt: Maybe<Scalars["Int"]>;
  readonly gte: Maybe<Scalars["Int"]>;
  readonly in: Maybe<ReadonlyArray<Maybe<Scalars["Int"]>>>;
  readonly lt: Maybe<Scalars["Int"]>;
  readonly lte: Maybe<Scalars["Int"]>;
  readonly ne: Maybe<Scalars["Int"]>;
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
  readonly progressive: Maybe<Scalars["Boolean"]>;
  readonly quality: Maybe<Scalars["Int"]>;
};

export type JsonQueryOperatorInput = {
  readonly eq: Maybe<Scalars["JSON"]>;
  readonly glob: Maybe<Scalars["JSON"]>;
  readonly in: Maybe<ReadonlyArray<Maybe<Scalars["JSON"]>>>;
  readonly ne: Maybe<Scalars["JSON"]>;
  readonly nin: Maybe<ReadonlyArray<Maybe<Scalars["JSON"]>>>;
  readonly regex: Maybe<Scalars["JSON"]>;
};

export enum MarkdownExcerptFormats {
  Html = "HTML",
  Markdown = "MARKDOWN",
  Plain = "PLAIN",
}

export type MarkdownHeading = {
  readonly __typename?: "MarkdownHeading";
  readonly depth: Maybe<Scalars["Int"]>;
  readonly id: Maybe<Scalars["String"]>;
  readonly value: Maybe<Scalars["String"]>;
};

export type MarkdownHeadingFilterInput = {
  readonly depth: Maybe<IntQueryOperatorInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly value: Maybe<StringQueryOperatorInput>;
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
  readonly children: ReadonlyArray<Node>;
  readonly excerpt: Maybe<Scalars["String"]>;
  readonly excerptAst: Maybe<Scalars["JSON"]>;
  readonly fields: Maybe<MarkdownRemarkFields>;
  readonly fileAbsolutePath: Maybe<Scalars["String"]>;
  readonly frontmatter: Maybe<MarkdownRemarkFrontmatter>;
  readonly headings: Maybe<ReadonlyArray<Maybe<MarkdownHeading>>>;
  readonly hero: Maybe<File>;
  readonly html: Maybe<Scalars["String"]>;
  readonly htmlAst: Maybe<Scalars["JSON"]>;
  readonly id: Scalars["ID"];
  readonly internal: Internal;
  readonly parent: Maybe<Node>;
  readonly rawMarkdownBody: Maybe<Scalars["String"]>;
  readonly tableOfContents: Maybe<Scalars["String"]>;
  readonly timeToRead: Maybe<Scalars["Int"]>;
  readonly wordCount: Maybe<MarkdownWordCount>;
};

export type MarkdownRemarkExcerptArgs = {
  format?: Maybe<MarkdownExcerptFormats>;
  pruneLength?: Maybe<Scalars["Int"]>;
  truncate?: Maybe<Scalars["Boolean"]>;
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
  heading: Maybe<Scalars["String"]>;
  maxDepth: Maybe<Scalars["Int"]>;
  pathToSlugField?: Maybe<Scalars["String"]>;
};

export type MarkdownRemarkConnection = {
  readonly __typename?: "MarkdownRemarkConnection";
  readonly distinct: ReadonlyArray<Scalars["String"]>;
  readonly edges: ReadonlyArray<MarkdownRemarkEdge>;
  readonly group: ReadonlyArray<MarkdownRemarkGroupConnection>;
  readonly max: Maybe<Scalars["Float"]>;
  readonly min: Maybe<Scalars["Float"]>;
  readonly nodes: ReadonlyArray<MarkdownRemark>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars["Float"]>;
  readonly totalCount: Scalars["Int"];
};

export type MarkdownRemarkConnectionDistinctArgs = {
  field: MarkdownRemarkFieldsEnum;
};

export type MarkdownRemarkConnectionGroupArgs = {
  field: MarkdownRemarkFieldsEnum;
  limit: Maybe<Scalars["Int"]>;
  skip: Maybe<Scalars["Int"]>;
};

export type MarkdownRemarkConnectionMaxArgs = {
  field: MarkdownRemarkFieldsEnum;
};

export type MarkdownRemarkConnectionMinArgs = {
  field: MarkdownRemarkFieldsEnum;
};

export type MarkdownRemarkConnectionSumArgs = {
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
  Children = "children",
  ChildrenChildren = "children___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenId = "children___id",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentParentId = "children___parent___parent___id",
  Excerpt = "excerpt",
  ExcerptAst = "excerptAst",
  FieldsSlug = "fields___slug",
  FileAbsolutePath = "fileAbsolutePath",
  FrontmatterAuthor = "frontmatter___author",
  FrontmatterCategories = "frontmatter___categories",
  FrontmatterDate = "frontmatter___date",
  FrontmatterExcerpt = "frontmatter___excerpt",
  FrontmatterHero = "frontmatter___hero",
  FrontmatterLang = "frontmatter___lang",
  FrontmatterTitle = "frontmatter___title",
  FrontmatterType = "frontmatter___type",
  Headings = "headings",
  HeadingsDepth = "headings___depth",
  HeadingsId = "headings___id",
  HeadingsValue = "headings___value",
  HeroAbsolutePath = "hero___absolutePath",
  HeroAccessTime = "hero___accessTime",
  HeroAtime = "hero___atime",
  HeroAtimeMs = "hero___atimeMs",
  HeroBase = "hero___base",
  HeroBirthTime = "hero___birthTime",
  HeroBirthtime = "hero___birthtime",
  HeroBirthtimeMs = "hero___birthtimeMs",
  HeroBlksize = "hero___blksize",
  HeroBlocks = "hero___blocks",
  HeroChangeTime = "hero___changeTime",
  HeroChildImageSharpChildren = "hero___childImageSharp___children",
  HeroChildImageSharpChildrenChildren = "hero___childImageSharp___children___children",
  HeroChildImageSharpChildrenId = "hero___childImageSharp___children___id",
  HeroChildImageSharpFixedAspectRatio = "hero___childImageSharp___fixed___aspectRatio",
  HeroChildImageSharpFixedBase64 = "hero___childImageSharp___fixed___base64",
  HeroChildImageSharpFixedHeight = "hero___childImageSharp___fixed___height",
  HeroChildImageSharpFixedOriginalName = "hero___childImageSharp___fixed___originalName",
  HeroChildImageSharpFixedSrc = "hero___childImageSharp___fixed___src",
  HeroChildImageSharpFixedSrcSet = "hero___childImageSharp___fixed___srcSet",
  HeroChildImageSharpFixedSrcSetWebp = "hero___childImageSharp___fixed___srcSetWebp",
  HeroChildImageSharpFixedSrcWebp = "hero___childImageSharp___fixed___srcWebp",
  HeroChildImageSharpFixedTracedSvg = "hero___childImageSharp___fixed___tracedSVG",
  HeroChildImageSharpFixedWidth = "hero___childImageSharp___fixed___width",
  HeroChildImageSharpFluidAspectRatio = "hero___childImageSharp___fluid___aspectRatio",
  HeroChildImageSharpFluidBase64 = "hero___childImageSharp___fluid___base64",
  HeroChildImageSharpFluidOriginalImg = "hero___childImageSharp___fluid___originalImg",
  HeroChildImageSharpFluidOriginalName = "hero___childImageSharp___fluid___originalName",
  HeroChildImageSharpFluidPresentationHeight = "hero___childImageSharp___fluid___presentationHeight",
  HeroChildImageSharpFluidPresentationWidth = "hero___childImageSharp___fluid___presentationWidth",
  HeroChildImageSharpFluidSizes = "hero___childImageSharp___fluid___sizes",
  HeroChildImageSharpFluidSrc = "hero___childImageSharp___fluid___src",
  HeroChildImageSharpFluidSrcSet = "hero___childImageSharp___fluid___srcSet",
  HeroChildImageSharpFluidSrcSetWebp = "hero___childImageSharp___fluid___srcSetWebp",
  HeroChildImageSharpFluidSrcWebp = "hero___childImageSharp___fluid___srcWebp",
  HeroChildImageSharpFluidTracedSvg = "hero___childImageSharp___fluid___tracedSVG",
  HeroChildImageSharpGatsbyImageData = "hero___childImageSharp___gatsbyImageData",
  HeroChildImageSharpId = "hero___childImageSharp___id",
  HeroChildImageSharpInternalContent = "hero___childImageSharp___internal___content",
  HeroChildImageSharpInternalContentDigest = "hero___childImageSharp___internal___contentDigest",
  HeroChildImageSharpInternalDescription = "hero___childImageSharp___internal___description",
  HeroChildImageSharpInternalFieldOwners = "hero___childImageSharp___internal___fieldOwners",
  HeroChildImageSharpInternalIgnoreType = "hero___childImageSharp___internal___ignoreType",
  HeroChildImageSharpInternalMediaType = "hero___childImageSharp___internal___mediaType",
  HeroChildImageSharpInternalOwner = "hero___childImageSharp___internal___owner",
  HeroChildImageSharpInternalType = "hero___childImageSharp___internal___type",
  HeroChildImageSharpOriginalHeight = "hero___childImageSharp___original___height",
  HeroChildImageSharpOriginalSrc = "hero___childImageSharp___original___src",
  HeroChildImageSharpOriginalWidth = "hero___childImageSharp___original___width",
  HeroChildImageSharpParentChildren = "hero___childImageSharp___parent___children",
  HeroChildImageSharpParentId = "hero___childImageSharp___parent___id",
  HeroChildImageSharpResizeAspectRatio = "hero___childImageSharp___resize___aspectRatio",
  HeroChildImageSharpResizeHeight = "hero___childImageSharp___resize___height",
  HeroChildImageSharpResizeOriginalName = "hero___childImageSharp___resize___originalName",
  HeroChildImageSharpResizeSrc = "hero___childImageSharp___resize___src",
  HeroChildImageSharpResizeTracedSvg = "hero___childImageSharp___resize___tracedSVG",
  HeroChildImageSharpResizeWidth = "hero___childImageSharp___resize___width",
  HeroChildMarkdownRemarkChildren = "hero___childMarkdownRemark___children",
  HeroChildMarkdownRemarkChildrenChildren = "hero___childMarkdownRemark___children___children",
  HeroChildMarkdownRemarkChildrenId = "hero___childMarkdownRemark___children___id",
  HeroChildMarkdownRemarkExcerpt = "hero___childMarkdownRemark___excerpt",
  HeroChildMarkdownRemarkExcerptAst = "hero___childMarkdownRemark___excerptAst",
  HeroChildMarkdownRemarkFieldsSlug = "hero___childMarkdownRemark___fields___slug",
  HeroChildMarkdownRemarkFileAbsolutePath = "hero___childMarkdownRemark___fileAbsolutePath",
  HeroChildMarkdownRemarkFrontmatterAuthor = "hero___childMarkdownRemark___frontmatter___author",
  HeroChildMarkdownRemarkFrontmatterCategories = "hero___childMarkdownRemark___frontmatter___categories",
  HeroChildMarkdownRemarkFrontmatterDate = "hero___childMarkdownRemark___frontmatter___date",
  HeroChildMarkdownRemarkFrontmatterExcerpt = "hero___childMarkdownRemark___frontmatter___excerpt",
  HeroChildMarkdownRemarkFrontmatterHero = "hero___childMarkdownRemark___frontmatter___hero",
  HeroChildMarkdownRemarkFrontmatterLang = "hero___childMarkdownRemark___frontmatter___lang",
  HeroChildMarkdownRemarkFrontmatterTitle = "hero___childMarkdownRemark___frontmatter___title",
  HeroChildMarkdownRemarkFrontmatterType = "hero___childMarkdownRemark___frontmatter___type",
  HeroChildMarkdownRemarkHeadings = "hero___childMarkdownRemark___headings",
  HeroChildMarkdownRemarkHeadingsDepth = "hero___childMarkdownRemark___headings___depth",
  HeroChildMarkdownRemarkHeadingsId = "hero___childMarkdownRemark___headings___id",
  HeroChildMarkdownRemarkHeadingsValue = "hero___childMarkdownRemark___headings___value",
  HeroChildMarkdownRemarkHeroAbsolutePath = "hero___childMarkdownRemark___hero___absolutePath",
  HeroChildMarkdownRemarkHeroAccessTime = "hero___childMarkdownRemark___hero___accessTime",
  HeroChildMarkdownRemarkHeroAtime = "hero___childMarkdownRemark___hero___atime",
  HeroChildMarkdownRemarkHeroAtimeMs = "hero___childMarkdownRemark___hero___atimeMs",
  HeroChildMarkdownRemarkHeroBase = "hero___childMarkdownRemark___hero___base",
  HeroChildMarkdownRemarkHeroBirthTime = "hero___childMarkdownRemark___hero___birthTime",
  HeroChildMarkdownRemarkHeroBirthtime = "hero___childMarkdownRemark___hero___birthtime",
  HeroChildMarkdownRemarkHeroBirthtimeMs = "hero___childMarkdownRemark___hero___birthtimeMs",
  HeroChildMarkdownRemarkHeroBlksize = "hero___childMarkdownRemark___hero___blksize",
  HeroChildMarkdownRemarkHeroBlocks = "hero___childMarkdownRemark___hero___blocks",
  HeroChildMarkdownRemarkHeroChangeTime = "hero___childMarkdownRemark___hero___changeTime",
  HeroChildMarkdownRemarkHeroChildren = "hero___childMarkdownRemark___hero___children",
  HeroChildMarkdownRemarkHeroChildrenImageSharp = "hero___childMarkdownRemark___hero___childrenImageSharp",
  HeroChildMarkdownRemarkHeroChildrenMarkdownRemark = "hero___childMarkdownRemark___hero___childrenMarkdownRemark",
  HeroChildMarkdownRemarkHeroCtime = "hero___childMarkdownRemark___hero___ctime",
  HeroChildMarkdownRemarkHeroCtimeMs = "hero___childMarkdownRemark___hero___ctimeMs",
  HeroChildMarkdownRemarkHeroDev = "hero___childMarkdownRemark___hero___dev",
  HeroChildMarkdownRemarkHeroDir = "hero___childMarkdownRemark___hero___dir",
  HeroChildMarkdownRemarkHeroExt = "hero___childMarkdownRemark___hero___ext",
  HeroChildMarkdownRemarkHeroExtension = "hero___childMarkdownRemark___hero___extension",
  HeroChildMarkdownRemarkHeroGid = "hero___childMarkdownRemark___hero___gid",
  HeroChildMarkdownRemarkHeroId = "hero___childMarkdownRemark___hero___id",
  HeroChildMarkdownRemarkHeroIno = "hero___childMarkdownRemark___hero___ino",
  HeroChildMarkdownRemarkHeroMode = "hero___childMarkdownRemark___hero___mode",
  HeroChildMarkdownRemarkHeroModifiedTime = "hero___childMarkdownRemark___hero___modifiedTime",
  HeroChildMarkdownRemarkHeroMtime = "hero___childMarkdownRemark___hero___mtime",
  HeroChildMarkdownRemarkHeroMtimeMs = "hero___childMarkdownRemark___hero___mtimeMs",
  HeroChildMarkdownRemarkHeroName = "hero___childMarkdownRemark___hero___name",
  HeroChildMarkdownRemarkHeroNlink = "hero___childMarkdownRemark___hero___nlink",
  HeroChildMarkdownRemarkHeroPrettySize = "hero___childMarkdownRemark___hero___prettySize",
  HeroChildMarkdownRemarkHeroPublicUrl = "hero___childMarkdownRemark___hero___publicURL",
  HeroChildMarkdownRemarkHeroRdev = "hero___childMarkdownRemark___hero___rdev",
  HeroChildMarkdownRemarkHeroRelativeDirectory = "hero___childMarkdownRemark___hero___relativeDirectory",
  HeroChildMarkdownRemarkHeroRelativePath = "hero___childMarkdownRemark___hero___relativePath",
  HeroChildMarkdownRemarkHeroRoot = "hero___childMarkdownRemark___hero___root",
  HeroChildMarkdownRemarkHeroSize = "hero___childMarkdownRemark___hero___size",
  HeroChildMarkdownRemarkHeroSourceInstanceName = "hero___childMarkdownRemark___hero___sourceInstanceName",
  HeroChildMarkdownRemarkHeroUid = "hero___childMarkdownRemark___hero___uid",
  HeroChildMarkdownRemarkHeroUrl = "hero___childMarkdownRemark___hero___url",
  HeroChildMarkdownRemarkHtml = "hero___childMarkdownRemark___html",
  HeroChildMarkdownRemarkHtmlAst = "hero___childMarkdownRemark___htmlAst",
  HeroChildMarkdownRemarkId = "hero___childMarkdownRemark___id",
  HeroChildMarkdownRemarkInternalContent = "hero___childMarkdownRemark___internal___content",
  HeroChildMarkdownRemarkInternalContentDigest = "hero___childMarkdownRemark___internal___contentDigest",
  HeroChildMarkdownRemarkInternalDescription = "hero___childMarkdownRemark___internal___description",
  HeroChildMarkdownRemarkInternalFieldOwners = "hero___childMarkdownRemark___internal___fieldOwners",
  HeroChildMarkdownRemarkInternalIgnoreType = "hero___childMarkdownRemark___internal___ignoreType",
  HeroChildMarkdownRemarkInternalMediaType = "hero___childMarkdownRemark___internal___mediaType",
  HeroChildMarkdownRemarkInternalOwner = "hero___childMarkdownRemark___internal___owner",
  HeroChildMarkdownRemarkInternalType = "hero___childMarkdownRemark___internal___type",
  HeroChildMarkdownRemarkParentChildren = "hero___childMarkdownRemark___parent___children",
  HeroChildMarkdownRemarkParentId = "hero___childMarkdownRemark___parent___id",
  HeroChildMarkdownRemarkRawMarkdownBody = "hero___childMarkdownRemark___rawMarkdownBody",
  HeroChildMarkdownRemarkTableOfContents = "hero___childMarkdownRemark___tableOfContents",
  HeroChildMarkdownRemarkTimeToRead = "hero___childMarkdownRemark___timeToRead",
  HeroChildMarkdownRemarkWordCountParagraphs = "hero___childMarkdownRemark___wordCount___paragraphs",
  HeroChildMarkdownRemarkWordCountSentences = "hero___childMarkdownRemark___wordCount___sentences",
  HeroChildMarkdownRemarkWordCountWords = "hero___childMarkdownRemark___wordCount___words",
  HeroChildren = "hero___children",
  HeroChildrenImageSharp = "hero___childrenImageSharp",
  HeroChildrenImageSharpChildren = "hero___childrenImageSharp___children",
  HeroChildrenImageSharpChildrenChildren = "hero___childrenImageSharp___children___children",
  HeroChildrenImageSharpChildrenId = "hero___childrenImageSharp___children___id",
  HeroChildrenImageSharpFixedAspectRatio = "hero___childrenImageSharp___fixed___aspectRatio",
  HeroChildrenImageSharpFixedBase64 = "hero___childrenImageSharp___fixed___base64",
  HeroChildrenImageSharpFixedHeight = "hero___childrenImageSharp___fixed___height",
  HeroChildrenImageSharpFixedOriginalName = "hero___childrenImageSharp___fixed___originalName",
  HeroChildrenImageSharpFixedSrc = "hero___childrenImageSharp___fixed___src",
  HeroChildrenImageSharpFixedSrcSet = "hero___childrenImageSharp___fixed___srcSet",
  HeroChildrenImageSharpFixedSrcSetWebp = "hero___childrenImageSharp___fixed___srcSetWebp",
  HeroChildrenImageSharpFixedSrcWebp = "hero___childrenImageSharp___fixed___srcWebp",
  HeroChildrenImageSharpFixedTracedSvg = "hero___childrenImageSharp___fixed___tracedSVG",
  HeroChildrenImageSharpFixedWidth = "hero___childrenImageSharp___fixed___width",
  HeroChildrenImageSharpFluidAspectRatio = "hero___childrenImageSharp___fluid___aspectRatio",
  HeroChildrenImageSharpFluidBase64 = "hero___childrenImageSharp___fluid___base64",
  HeroChildrenImageSharpFluidOriginalImg = "hero___childrenImageSharp___fluid___originalImg",
  HeroChildrenImageSharpFluidOriginalName = "hero___childrenImageSharp___fluid___originalName",
  HeroChildrenImageSharpFluidPresentationHeight = "hero___childrenImageSharp___fluid___presentationHeight",
  HeroChildrenImageSharpFluidPresentationWidth = "hero___childrenImageSharp___fluid___presentationWidth",
  HeroChildrenImageSharpFluidSizes = "hero___childrenImageSharp___fluid___sizes",
  HeroChildrenImageSharpFluidSrc = "hero___childrenImageSharp___fluid___src",
  HeroChildrenImageSharpFluidSrcSet = "hero___childrenImageSharp___fluid___srcSet",
  HeroChildrenImageSharpFluidSrcSetWebp = "hero___childrenImageSharp___fluid___srcSetWebp",
  HeroChildrenImageSharpFluidSrcWebp = "hero___childrenImageSharp___fluid___srcWebp",
  HeroChildrenImageSharpFluidTracedSvg = "hero___childrenImageSharp___fluid___tracedSVG",
  HeroChildrenImageSharpGatsbyImageData = "hero___childrenImageSharp___gatsbyImageData",
  HeroChildrenImageSharpId = "hero___childrenImageSharp___id",
  HeroChildrenImageSharpInternalContent = "hero___childrenImageSharp___internal___content",
  HeroChildrenImageSharpInternalContentDigest = "hero___childrenImageSharp___internal___contentDigest",
  HeroChildrenImageSharpInternalDescription = "hero___childrenImageSharp___internal___description",
  HeroChildrenImageSharpInternalFieldOwners = "hero___childrenImageSharp___internal___fieldOwners",
  HeroChildrenImageSharpInternalIgnoreType = "hero___childrenImageSharp___internal___ignoreType",
  HeroChildrenImageSharpInternalMediaType = "hero___childrenImageSharp___internal___mediaType",
  HeroChildrenImageSharpInternalOwner = "hero___childrenImageSharp___internal___owner",
  HeroChildrenImageSharpInternalType = "hero___childrenImageSharp___internal___type",
  HeroChildrenImageSharpOriginalHeight = "hero___childrenImageSharp___original___height",
  HeroChildrenImageSharpOriginalSrc = "hero___childrenImageSharp___original___src",
  HeroChildrenImageSharpOriginalWidth = "hero___childrenImageSharp___original___width",
  HeroChildrenImageSharpParentChildren = "hero___childrenImageSharp___parent___children",
  HeroChildrenImageSharpParentId = "hero___childrenImageSharp___parent___id",
  HeroChildrenImageSharpResizeAspectRatio = "hero___childrenImageSharp___resize___aspectRatio",
  HeroChildrenImageSharpResizeHeight = "hero___childrenImageSharp___resize___height",
  HeroChildrenImageSharpResizeOriginalName = "hero___childrenImageSharp___resize___originalName",
  HeroChildrenImageSharpResizeSrc = "hero___childrenImageSharp___resize___src",
  HeroChildrenImageSharpResizeTracedSvg = "hero___childrenImageSharp___resize___tracedSVG",
  HeroChildrenImageSharpResizeWidth = "hero___childrenImageSharp___resize___width",
  HeroChildrenMarkdownRemark = "hero___childrenMarkdownRemark",
  HeroChildrenMarkdownRemarkChildren = "hero___childrenMarkdownRemark___children",
  HeroChildrenMarkdownRemarkChildrenChildren = "hero___childrenMarkdownRemark___children___children",
  HeroChildrenMarkdownRemarkChildrenId = "hero___childrenMarkdownRemark___children___id",
  HeroChildrenMarkdownRemarkExcerpt = "hero___childrenMarkdownRemark___excerpt",
  HeroChildrenMarkdownRemarkExcerptAst = "hero___childrenMarkdownRemark___excerptAst",
  HeroChildrenMarkdownRemarkFieldsSlug = "hero___childrenMarkdownRemark___fields___slug",
  HeroChildrenMarkdownRemarkFileAbsolutePath = "hero___childrenMarkdownRemark___fileAbsolutePath",
  HeroChildrenMarkdownRemarkFrontmatterAuthor = "hero___childrenMarkdownRemark___frontmatter___author",
  HeroChildrenMarkdownRemarkFrontmatterCategories = "hero___childrenMarkdownRemark___frontmatter___categories",
  HeroChildrenMarkdownRemarkFrontmatterDate = "hero___childrenMarkdownRemark___frontmatter___date",
  HeroChildrenMarkdownRemarkFrontmatterExcerpt = "hero___childrenMarkdownRemark___frontmatter___excerpt",
  HeroChildrenMarkdownRemarkFrontmatterHero = "hero___childrenMarkdownRemark___frontmatter___hero",
  HeroChildrenMarkdownRemarkFrontmatterLang = "hero___childrenMarkdownRemark___frontmatter___lang",
  HeroChildrenMarkdownRemarkFrontmatterTitle = "hero___childrenMarkdownRemark___frontmatter___title",
  HeroChildrenMarkdownRemarkFrontmatterType = "hero___childrenMarkdownRemark___frontmatter___type",
  HeroChildrenMarkdownRemarkHeadings = "hero___childrenMarkdownRemark___headings",
  HeroChildrenMarkdownRemarkHeadingsDepth = "hero___childrenMarkdownRemark___headings___depth",
  HeroChildrenMarkdownRemarkHeadingsId = "hero___childrenMarkdownRemark___headings___id",
  HeroChildrenMarkdownRemarkHeadingsValue = "hero___childrenMarkdownRemark___headings___value",
  HeroChildrenMarkdownRemarkHeroAbsolutePath = "hero___childrenMarkdownRemark___hero___absolutePath",
  HeroChildrenMarkdownRemarkHeroAccessTime = "hero___childrenMarkdownRemark___hero___accessTime",
  HeroChildrenMarkdownRemarkHeroAtime = "hero___childrenMarkdownRemark___hero___atime",
  HeroChildrenMarkdownRemarkHeroAtimeMs = "hero___childrenMarkdownRemark___hero___atimeMs",
  HeroChildrenMarkdownRemarkHeroBase = "hero___childrenMarkdownRemark___hero___base",
  HeroChildrenMarkdownRemarkHeroBirthTime = "hero___childrenMarkdownRemark___hero___birthTime",
  HeroChildrenMarkdownRemarkHeroBirthtime = "hero___childrenMarkdownRemark___hero___birthtime",
  HeroChildrenMarkdownRemarkHeroBirthtimeMs = "hero___childrenMarkdownRemark___hero___birthtimeMs",
  HeroChildrenMarkdownRemarkHeroBlksize = "hero___childrenMarkdownRemark___hero___blksize",
  HeroChildrenMarkdownRemarkHeroBlocks = "hero___childrenMarkdownRemark___hero___blocks",
  HeroChildrenMarkdownRemarkHeroChangeTime = "hero___childrenMarkdownRemark___hero___changeTime",
  HeroChildrenMarkdownRemarkHeroChildren = "hero___childrenMarkdownRemark___hero___children",
  HeroChildrenMarkdownRemarkHeroChildrenImageSharp = "hero___childrenMarkdownRemark___hero___childrenImageSharp",
  HeroChildrenMarkdownRemarkHeroChildrenMarkdownRemark = "hero___childrenMarkdownRemark___hero___childrenMarkdownRemark",
  HeroChildrenMarkdownRemarkHeroCtime = "hero___childrenMarkdownRemark___hero___ctime",
  HeroChildrenMarkdownRemarkHeroCtimeMs = "hero___childrenMarkdownRemark___hero___ctimeMs",
  HeroChildrenMarkdownRemarkHeroDev = "hero___childrenMarkdownRemark___hero___dev",
  HeroChildrenMarkdownRemarkHeroDir = "hero___childrenMarkdownRemark___hero___dir",
  HeroChildrenMarkdownRemarkHeroExt = "hero___childrenMarkdownRemark___hero___ext",
  HeroChildrenMarkdownRemarkHeroExtension = "hero___childrenMarkdownRemark___hero___extension",
  HeroChildrenMarkdownRemarkHeroGid = "hero___childrenMarkdownRemark___hero___gid",
  HeroChildrenMarkdownRemarkHeroId = "hero___childrenMarkdownRemark___hero___id",
  HeroChildrenMarkdownRemarkHeroIno = "hero___childrenMarkdownRemark___hero___ino",
  HeroChildrenMarkdownRemarkHeroMode = "hero___childrenMarkdownRemark___hero___mode",
  HeroChildrenMarkdownRemarkHeroModifiedTime = "hero___childrenMarkdownRemark___hero___modifiedTime",
  HeroChildrenMarkdownRemarkHeroMtime = "hero___childrenMarkdownRemark___hero___mtime",
  HeroChildrenMarkdownRemarkHeroMtimeMs = "hero___childrenMarkdownRemark___hero___mtimeMs",
  HeroChildrenMarkdownRemarkHeroName = "hero___childrenMarkdownRemark___hero___name",
  HeroChildrenMarkdownRemarkHeroNlink = "hero___childrenMarkdownRemark___hero___nlink",
  HeroChildrenMarkdownRemarkHeroPrettySize = "hero___childrenMarkdownRemark___hero___prettySize",
  HeroChildrenMarkdownRemarkHeroPublicUrl = "hero___childrenMarkdownRemark___hero___publicURL",
  HeroChildrenMarkdownRemarkHeroRdev = "hero___childrenMarkdownRemark___hero___rdev",
  HeroChildrenMarkdownRemarkHeroRelativeDirectory = "hero___childrenMarkdownRemark___hero___relativeDirectory",
  HeroChildrenMarkdownRemarkHeroRelativePath = "hero___childrenMarkdownRemark___hero___relativePath",
  HeroChildrenMarkdownRemarkHeroRoot = "hero___childrenMarkdownRemark___hero___root",
  HeroChildrenMarkdownRemarkHeroSize = "hero___childrenMarkdownRemark___hero___size",
  HeroChildrenMarkdownRemarkHeroSourceInstanceName = "hero___childrenMarkdownRemark___hero___sourceInstanceName",
  HeroChildrenMarkdownRemarkHeroUid = "hero___childrenMarkdownRemark___hero___uid",
  HeroChildrenMarkdownRemarkHeroUrl = "hero___childrenMarkdownRemark___hero___url",
  HeroChildrenMarkdownRemarkHtml = "hero___childrenMarkdownRemark___html",
  HeroChildrenMarkdownRemarkHtmlAst = "hero___childrenMarkdownRemark___htmlAst",
  HeroChildrenMarkdownRemarkId = "hero___childrenMarkdownRemark___id",
  HeroChildrenMarkdownRemarkInternalContent = "hero___childrenMarkdownRemark___internal___content",
  HeroChildrenMarkdownRemarkInternalContentDigest = "hero___childrenMarkdownRemark___internal___contentDigest",
  HeroChildrenMarkdownRemarkInternalDescription = "hero___childrenMarkdownRemark___internal___description",
  HeroChildrenMarkdownRemarkInternalFieldOwners = "hero___childrenMarkdownRemark___internal___fieldOwners",
  HeroChildrenMarkdownRemarkInternalIgnoreType = "hero___childrenMarkdownRemark___internal___ignoreType",
  HeroChildrenMarkdownRemarkInternalMediaType = "hero___childrenMarkdownRemark___internal___mediaType",
  HeroChildrenMarkdownRemarkInternalOwner = "hero___childrenMarkdownRemark___internal___owner",
  HeroChildrenMarkdownRemarkInternalType = "hero___childrenMarkdownRemark___internal___type",
  HeroChildrenMarkdownRemarkParentChildren = "hero___childrenMarkdownRemark___parent___children",
  HeroChildrenMarkdownRemarkParentId = "hero___childrenMarkdownRemark___parent___id",
  HeroChildrenMarkdownRemarkRawMarkdownBody = "hero___childrenMarkdownRemark___rawMarkdownBody",
  HeroChildrenMarkdownRemarkTableOfContents = "hero___childrenMarkdownRemark___tableOfContents",
  HeroChildrenMarkdownRemarkTimeToRead = "hero___childrenMarkdownRemark___timeToRead",
  HeroChildrenMarkdownRemarkWordCountParagraphs = "hero___childrenMarkdownRemark___wordCount___paragraphs",
  HeroChildrenMarkdownRemarkWordCountSentences = "hero___childrenMarkdownRemark___wordCount___sentences",
  HeroChildrenMarkdownRemarkWordCountWords = "hero___childrenMarkdownRemark___wordCount___words",
  HeroChildrenChildren = "hero___children___children",
  HeroChildrenChildrenChildren = "hero___children___children___children",
  HeroChildrenChildrenId = "hero___children___children___id",
  HeroChildrenId = "hero___children___id",
  HeroChildrenInternalContent = "hero___children___internal___content",
  HeroChildrenInternalContentDigest = "hero___children___internal___contentDigest",
  HeroChildrenInternalDescription = "hero___children___internal___description",
  HeroChildrenInternalFieldOwners = "hero___children___internal___fieldOwners",
  HeroChildrenInternalIgnoreType = "hero___children___internal___ignoreType",
  HeroChildrenInternalMediaType = "hero___children___internal___mediaType",
  HeroChildrenInternalOwner = "hero___children___internal___owner",
  HeroChildrenInternalType = "hero___children___internal___type",
  HeroChildrenParentChildren = "hero___children___parent___children",
  HeroChildrenParentId = "hero___children___parent___id",
  HeroCtime = "hero___ctime",
  HeroCtimeMs = "hero___ctimeMs",
  HeroDev = "hero___dev",
  HeroDir = "hero___dir",
  HeroExt = "hero___ext",
  HeroExtension = "hero___extension",
  HeroGid = "hero___gid",
  HeroId = "hero___id",
  HeroIno = "hero___ino",
  HeroInternalContent = "hero___internal___content",
  HeroInternalContentDigest = "hero___internal___contentDigest",
  HeroInternalDescription = "hero___internal___description",
  HeroInternalFieldOwners = "hero___internal___fieldOwners",
  HeroInternalIgnoreType = "hero___internal___ignoreType",
  HeroInternalMediaType = "hero___internal___mediaType",
  HeroInternalOwner = "hero___internal___owner",
  HeroInternalType = "hero___internal___type",
  HeroMode = "hero___mode",
  HeroModifiedTime = "hero___modifiedTime",
  HeroMtime = "hero___mtime",
  HeroMtimeMs = "hero___mtimeMs",
  HeroName = "hero___name",
  HeroNlink = "hero___nlink",
  HeroParentChildren = "hero___parent___children",
  HeroParentChildrenChildren = "hero___parent___children___children",
  HeroParentChildrenId = "hero___parent___children___id",
  HeroParentId = "hero___parent___id",
  HeroParentInternalContent = "hero___parent___internal___content",
  HeroParentInternalContentDigest = "hero___parent___internal___contentDigest",
  HeroParentInternalDescription = "hero___parent___internal___description",
  HeroParentInternalFieldOwners = "hero___parent___internal___fieldOwners",
  HeroParentInternalIgnoreType = "hero___parent___internal___ignoreType",
  HeroParentInternalMediaType = "hero___parent___internal___mediaType",
  HeroParentInternalOwner = "hero___parent___internal___owner",
  HeroParentInternalType = "hero___parent___internal___type",
  HeroParentParentChildren = "hero___parent___parent___children",
  HeroParentParentId = "hero___parent___parent___id",
  HeroPrettySize = "hero___prettySize",
  HeroPublicUrl = "hero___publicURL",
  HeroRdev = "hero___rdev",
  HeroRelativeDirectory = "hero___relativeDirectory",
  HeroRelativePath = "hero___relativePath",
  HeroRoot = "hero___root",
  HeroSize = "hero___size",
  HeroSourceInstanceName = "hero___sourceInstanceName",
  HeroUid = "hero___uid",
  HeroUrl = "hero___url",
  Html = "html",
  HtmlAst = "htmlAst",
  Id = "id",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
  ParentChildren = "parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenId = "parent___children___id",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentId = "parent___id",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentId = "parent___parent___id",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentParentId = "parent___parent___parent___id",
  RawMarkdownBody = "rawMarkdownBody",
  TableOfContents = "tableOfContents",
  TimeToRead = "timeToRead",
  WordCountParagraphs = "wordCount___paragraphs",
  WordCountSentences = "wordCount___sentences",
  WordCountWords = "wordCount___words",
}

export type MarkdownRemarkFieldsFilterInput = {
  readonly slug: Maybe<StringQueryOperatorInput>;
};

export type MarkdownRemarkFilterInput = {
  readonly children: Maybe<NodeFilterListInput>;
  readonly excerpt: Maybe<StringQueryOperatorInput>;
  readonly excerptAst: Maybe<JsonQueryOperatorInput>;
  readonly fields: Maybe<MarkdownRemarkFieldsFilterInput>;
  readonly fileAbsolutePath: Maybe<StringQueryOperatorInput>;
  readonly frontmatter: Maybe<MarkdownRemarkFrontmatterFilterInput>;
  readonly headings: Maybe<MarkdownHeadingFilterListInput>;
  readonly hero: Maybe<FileFilterInput>;
  readonly html: Maybe<StringQueryOperatorInput>;
  readonly htmlAst: Maybe<JsonQueryOperatorInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly internal: Maybe<InternalFilterInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly rawMarkdownBody: Maybe<StringQueryOperatorInput>;
  readonly tableOfContents: Maybe<StringQueryOperatorInput>;
  readonly timeToRead: Maybe<IntQueryOperatorInput>;
  readonly wordCount: Maybe<MarkdownWordCountFilterInput>;
};

export type MarkdownRemarkFilterListInput = {
  readonly elemMatch: Maybe<MarkdownRemarkFilterInput>;
};

export type MarkdownRemarkFrontmatter = {
  readonly __typename?: "MarkdownRemarkFrontmatter";
  readonly author: Maybe<Scalars["String"]>;
  readonly categories: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
  readonly date: Maybe<Scalars["Date"]>;
  readonly excerpt: Maybe<Scalars["String"]>;
  readonly hero: Maybe<Scalars["String"]>;
  readonly lang: Maybe<Scalars["String"]>;
  readonly title: Maybe<Scalars["String"]>;
  readonly type: Maybe<Scalars["String"]>;
};

export type MarkdownRemarkFrontmatterDateArgs = {
  difference: Maybe<Scalars["String"]>;
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  locale: Maybe<Scalars["String"]>;
};

export type MarkdownRemarkFrontmatterFilterInput = {
  readonly author: Maybe<StringQueryOperatorInput>;
  readonly categories: Maybe<StringQueryOperatorInput>;
  readonly date: Maybe<DateQueryOperatorInput>;
  readonly excerpt: Maybe<StringQueryOperatorInput>;
  readonly hero: Maybe<StringQueryOperatorInput>;
  readonly lang: Maybe<StringQueryOperatorInput>;
  readonly title: Maybe<StringQueryOperatorInput>;
  readonly type: Maybe<StringQueryOperatorInput>;
};

export type MarkdownRemarkGroupConnection = {
  readonly __typename?: "MarkdownRemarkGroupConnection";
  readonly edges: ReadonlyArray<MarkdownRemarkEdge>;
  readonly field: Scalars["String"];
  readonly fieldValue: Maybe<Scalars["String"]>;
  readonly nodes: ReadonlyArray<MarkdownRemark>;
  readonly pageInfo: PageInfo;
  readonly totalCount: Scalars["Int"];
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
  readonly children: ReadonlyArray<Node>;
  readonly id: Scalars["ID"];
  readonly internal: Internal;
  readonly parent: Maybe<Node>;
};

export type NodeFilterInput = {
  readonly children: Maybe<NodeFilterListInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly internal: Maybe<InternalFilterInput>;
  readonly parent: Maybe<NodeFilterInput>;
};

export type NodeFilterListInput = {
  readonly elemMatch: Maybe<NodeFilterInput>;
};

export type PngOptions = {
  readonly compressionSpeed: Maybe<Scalars["Int"]>;
  readonly quality: Maybe<Scalars["Int"]>;
};

export type PageInfo = {
  readonly __typename?: "PageInfo";
  readonly currentPage: Scalars["Int"];
  readonly hasNextPage: Scalars["Boolean"];
  readonly hasPreviousPage: Scalars["Boolean"];
  readonly itemCount: Scalars["Int"];
  readonly pageCount: Scalars["Int"];
  readonly perPage: Maybe<Scalars["Int"]>;
  readonly totalCount: Scalars["Int"];
};

export type Potrace = {
  readonly alphaMax: Maybe<Scalars["Float"]>;
  readonly background: Maybe<Scalars["String"]>;
  readonly blackOnWhite: Maybe<Scalars["Boolean"]>;
  readonly color: Maybe<Scalars["String"]>;
  readonly optCurve: Maybe<Scalars["Boolean"]>;
  readonly optTolerance: Maybe<Scalars["Float"]>;
  readonly threshold: Maybe<Scalars["Int"]>;
  readonly turdSize: Maybe<Scalars["Float"]>;
  readonly turnPolicy: Maybe<PotraceTurnPolicy>;
};

export enum PotraceTurnPolicy {
  TurnpolicyBlack = "TURNPOLICY_BLACK",
  TurnpolicyLeft = "TURNPOLICY_LEFT",
  TurnpolicyMajority = "TURNPOLICY_MAJORITY",
  TurnpolicyMinority = "TURNPOLICY_MINORITY",
  TurnpolicyRight = "TURNPOLICY_RIGHT",
  TurnpolicyWhite = "TURNPOLICY_WHITE",
}

export type Query = {
  readonly __typename?: "Query";
  readonly allDirectory: DirectoryConnection;
  readonly allFile: FileConnection;
  readonly allImageSharp: ImageSharpConnection;
  readonly allMarkdownRemark: MarkdownRemarkConnection;
  readonly allSite: SiteConnection;
  readonly allSiteBuildMetadata: SiteBuildMetadataConnection;
  readonly allSiteFunction: SiteFunctionConnection;
  readonly allSitePage: SitePageConnection;
  readonly allSitePlugin: SitePluginConnection;
  readonly directory: Maybe<Directory>;
  readonly file: Maybe<File>;
  readonly imageSharp: Maybe<ImageSharp>;
  readonly markdownRemark: Maybe<MarkdownRemark>;
  readonly site: Maybe<Site>;
  readonly siteBuildMetadata: Maybe<SiteBuildMetadata>;
  readonly siteFunction: Maybe<SiteFunction>;
  readonly sitePage: Maybe<SitePage>;
  readonly sitePlugin: Maybe<SitePlugin>;
};

export type QueryAllDirectoryArgs = {
  filter: Maybe<DirectoryFilterInput>;
  limit: Maybe<Scalars["Int"]>;
  skip: Maybe<Scalars["Int"]>;
  sort: Maybe<DirectorySortInput>;
};

export type QueryAllFileArgs = {
  filter: Maybe<FileFilterInput>;
  limit: Maybe<Scalars["Int"]>;
  skip: Maybe<Scalars["Int"]>;
  sort: Maybe<FileSortInput>;
};

export type QueryAllImageSharpArgs = {
  filter: Maybe<ImageSharpFilterInput>;
  limit: Maybe<Scalars["Int"]>;
  skip: Maybe<Scalars["Int"]>;
  sort: Maybe<ImageSharpSortInput>;
};

export type QueryAllMarkdownRemarkArgs = {
  filter: Maybe<MarkdownRemarkFilterInput>;
  limit: Maybe<Scalars["Int"]>;
  skip: Maybe<Scalars["Int"]>;
  sort: Maybe<MarkdownRemarkSortInput>;
};

export type QueryAllSiteArgs = {
  filter: Maybe<SiteFilterInput>;
  limit: Maybe<Scalars["Int"]>;
  skip: Maybe<Scalars["Int"]>;
  sort: Maybe<SiteSortInput>;
};

export type QueryAllSiteBuildMetadataArgs = {
  filter: Maybe<SiteBuildMetadataFilterInput>;
  limit: Maybe<Scalars["Int"]>;
  skip: Maybe<Scalars["Int"]>;
  sort: Maybe<SiteBuildMetadataSortInput>;
};

export type QueryAllSiteFunctionArgs = {
  filter: Maybe<SiteFunctionFilterInput>;
  limit: Maybe<Scalars["Int"]>;
  skip: Maybe<Scalars["Int"]>;
  sort: Maybe<SiteFunctionSortInput>;
};

export type QueryAllSitePageArgs = {
  filter: Maybe<SitePageFilterInput>;
  limit: Maybe<Scalars["Int"]>;
  skip: Maybe<Scalars["Int"]>;
  sort: Maybe<SitePageSortInput>;
};

export type QueryAllSitePluginArgs = {
  filter: Maybe<SitePluginFilterInput>;
  limit: Maybe<Scalars["Int"]>;
  skip: Maybe<Scalars["Int"]>;
  sort: Maybe<SitePluginSortInput>;
};

export type QueryDirectoryArgs = {
  absolutePath: Maybe<StringQueryOperatorInput>;
  accessTime: Maybe<DateQueryOperatorInput>;
  atime: Maybe<DateQueryOperatorInput>;
  atimeMs: Maybe<FloatQueryOperatorInput>;
  base: Maybe<StringQueryOperatorInput>;
  birthTime: Maybe<DateQueryOperatorInput>;
  birthtime: Maybe<DateQueryOperatorInput>;
  birthtimeMs: Maybe<FloatQueryOperatorInput>;
  blksize: Maybe<IntQueryOperatorInput>;
  blocks: Maybe<IntQueryOperatorInput>;
  changeTime: Maybe<DateQueryOperatorInput>;
  children: Maybe<NodeFilterListInput>;
  ctime: Maybe<DateQueryOperatorInput>;
  ctimeMs: Maybe<FloatQueryOperatorInput>;
  dev: Maybe<IntQueryOperatorInput>;
  dir: Maybe<StringQueryOperatorInput>;
  ext: Maybe<StringQueryOperatorInput>;
  extension: Maybe<StringQueryOperatorInput>;
  gid: Maybe<IntQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  ino: Maybe<FloatQueryOperatorInput>;
  internal: Maybe<InternalFilterInput>;
  mode: Maybe<IntQueryOperatorInput>;
  modifiedTime: Maybe<DateQueryOperatorInput>;
  mtime: Maybe<DateQueryOperatorInput>;
  mtimeMs: Maybe<FloatQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  nlink: Maybe<IntQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  prettySize: Maybe<StringQueryOperatorInput>;
  rdev: Maybe<IntQueryOperatorInput>;
  relativeDirectory: Maybe<StringQueryOperatorInput>;
  relativePath: Maybe<StringQueryOperatorInput>;
  root: Maybe<StringQueryOperatorInput>;
  size: Maybe<IntQueryOperatorInput>;
  sourceInstanceName: Maybe<StringQueryOperatorInput>;
  uid: Maybe<IntQueryOperatorInput>;
};

export type QueryFileArgs = {
  absolutePath: Maybe<StringQueryOperatorInput>;
  accessTime: Maybe<DateQueryOperatorInput>;
  atime: Maybe<DateQueryOperatorInput>;
  atimeMs: Maybe<FloatQueryOperatorInput>;
  base: Maybe<StringQueryOperatorInput>;
  birthTime: Maybe<DateQueryOperatorInput>;
  birthtime: Maybe<DateQueryOperatorInput>;
  birthtimeMs: Maybe<FloatQueryOperatorInput>;
  blksize: Maybe<IntQueryOperatorInput>;
  blocks: Maybe<IntQueryOperatorInput>;
  changeTime: Maybe<DateQueryOperatorInput>;
  childImageSharp: Maybe<ImageSharpFilterInput>;
  childMarkdownRemark: Maybe<MarkdownRemarkFilterInput>;
  children: Maybe<NodeFilterListInput>;
  childrenImageSharp: Maybe<ImageSharpFilterListInput>;
  childrenMarkdownRemark: Maybe<MarkdownRemarkFilterListInput>;
  ctime: Maybe<DateQueryOperatorInput>;
  ctimeMs: Maybe<FloatQueryOperatorInput>;
  dev: Maybe<IntQueryOperatorInput>;
  dir: Maybe<StringQueryOperatorInput>;
  ext: Maybe<StringQueryOperatorInput>;
  extension: Maybe<StringQueryOperatorInput>;
  gid: Maybe<IntQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  ino: Maybe<FloatQueryOperatorInput>;
  internal: Maybe<InternalFilterInput>;
  mode: Maybe<IntQueryOperatorInput>;
  modifiedTime: Maybe<DateQueryOperatorInput>;
  mtime: Maybe<DateQueryOperatorInput>;
  mtimeMs: Maybe<FloatQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  nlink: Maybe<IntQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  prettySize: Maybe<StringQueryOperatorInput>;
  publicURL: Maybe<StringQueryOperatorInput>;
  rdev: Maybe<IntQueryOperatorInput>;
  relativeDirectory: Maybe<StringQueryOperatorInput>;
  relativePath: Maybe<StringQueryOperatorInput>;
  root: Maybe<StringQueryOperatorInput>;
  size: Maybe<IntQueryOperatorInput>;
  sourceInstanceName: Maybe<StringQueryOperatorInput>;
  uid: Maybe<IntQueryOperatorInput>;
  url: Maybe<StringQueryOperatorInput>;
};

export type QueryImageSharpArgs = {
  children: Maybe<NodeFilterListInput>;
  fixed: Maybe<ImageSharpFixedFilterInput>;
  fluid: Maybe<ImageSharpFluidFilterInput>;
  gatsbyImageData: Maybe<JsonQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  internal: Maybe<InternalFilterInput>;
  original: Maybe<ImageSharpOriginalFilterInput>;
  parent: Maybe<NodeFilterInput>;
  resize: Maybe<ImageSharpResizeFilterInput>;
};

export type QueryMarkdownRemarkArgs = {
  children: Maybe<NodeFilterListInput>;
  excerpt: Maybe<StringQueryOperatorInput>;
  excerptAst: Maybe<JsonQueryOperatorInput>;
  fields: Maybe<MarkdownRemarkFieldsFilterInput>;
  fileAbsolutePath: Maybe<StringQueryOperatorInput>;
  frontmatter: Maybe<MarkdownRemarkFrontmatterFilterInput>;
  headings: Maybe<MarkdownHeadingFilterListInput>;
  hero: Maybe<FileFilterInput>;
  html: Maybe<StringQueryOperatorInput>;
  htmlAst: Maybe<JsonQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  internal: Maybe<InternalFilterInput>;
  parent: Maybe<NodeFilterInput>;
  rawMarkdownBody: Maybe<StringQueryOperatorInput>;
  tableOfContents: Maybe<StringQueryOperatorInput>;
  timeToRead: Maybe<IntQueryOperatorInput>;
  wordCount: Maybe<MarkdownWordCountFilterInput>;
};

export type QuerySiteArgs = {
  buildTime: Maybe<DateQueryOperatorInput>;
  children: Maybe<NodeFilterListInput>;
  flags: Maybe<SiteFlagsFilterInput>;
  host: Maybe<StringQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  internal: Maybe<InternalFilterInput>;
  parent: Maybe<NodeFilterInput>;
  pathPrefix: Maybe<StringQueryOperatorInput>;
  polyfill: Maybe<BooleanQueryOperatorInput>;
  port: Maybe<IntQueryOperatorInput>;
  siteMetadata: Maybe<SiteSiteMetadataFilterInput>;
};

export type QuerySiteBuildMetadataArgs = {
  buildTime: Maybe<DateQueryOperatorInput>;
  children: Maybe<NodeFilterListInput>;
  id: Maybe<StringQueryOperatorInput>;
  internal: Maybe<InternalFilterInput>;
  parent: Maybe<NodeFilterInput>;
};

export type QuerySiteFunctionArgs = {
  absoluteCompiledFilePath: Maybe<StringQueryOperatorInput>;
  children: Maybe<NodeFilterListInput>;
  functionRoute: Maybe<StringQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  internal: Maybe<InternalFilterInput>;
  matchPath: Maybe<StringQueryOperatorInput>;
  originalAbsoluteFilePath: Maybe<StringQueryOperatorInput>;
  originalRelativeFilePath: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  pluginName: Maybe<StringQueryOperatorInput>;
  relativeCompiledFilePath: Maybe<StringQueryOperatorInput>;
};

export type QuerySitePageArgs = {
  children: Maybe<NodeFilterListInput>;
  component: Maybe<StringQueryOperatorInput>;
  componentChunkName: Maybe<StringQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  internal: Maybe<InternalFilterInput>;
  internalComponentName: Maybe<StringQueryOperatorInput>;
  matchPath: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  path: Maybe<StringQueryOperatorInput>;
};

export type QuerySitePluginArgs = {
  browserAPIs: Maybe<StringQueryOperatorInput>;
  children: Maybe<NodeFilterListInput>;
  id: Maybe<StringQueryOperatorInput>;
  internal: Maybe<InternalFilterInput>;
  name: Maybe<StringQueryOperatorInput>;
  nodeAPIs: Maybe<StringQueryOperatorInput>;
  packageJson: Maybe<SitePluginPackageJsonFilterInput>;
  parent: Maybe<NodeFilterInput>;
  pluginFilepath: Maybe<StringQueryOperatorInput>;
  pluginOptions: Maybe<SitePluginPluginOptionsFilterInput>;
  resolve: Maybe<StringQueryOperatorInput>;
  ssrAPIs: Maybe<StringQueryOperatorInput>;
  version: Maybe<StringQueryOperatorInput>;
};

export type Site = Node & {
  readonly __typename?: "Site";
  readonly buildTime: Maybe<Scalars["Date"]>;
  readonly children: ReadonlyArray<Node>;
  readonly flags: Maybe<SiteFlags>;
  readonly host: Maybe<Scalars["String"]>;
  readonly id: Scalars["ID"];
  readonly internal: Internal;
  readonly parent: Maybe<Node>;
  readonly pathPrefix: Maybe<Scalars["String"]>;
  readonly polyfill: Maybe<Scalars["Boolean"]>;
  readonly port: Maybe<Scalars["Int"]>;
  readonly siteMetadata: Maybe<SiteSiteMetadata>;
};

export type SiteBuildTimeArgs = {
  difference: Maybe<Scalars["String"]>;
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  locale: Maybe<Scalars["String"]>;
};

export type SiteBuildMetadata = Node & {
  readonly __typename?: "SiteBuildMetadata";
  readonly buildTime: Maybe<Scalars["Date"]>;
  readonly children: ReadonlyArray<Node>;
  readonly id: Scalars["ID"];
  readonly internal: Internal;
  readonly parent: Maybe<Node>;
};

export type SiteBuildMetadataBuildTimeArgs = {
  difference: Maybe<Scalars["String"]>;
  formatString: Maybe<Scalars["String"]>;
  fromNow: Maybe<Scalars["Boolean"]>;
  locale: Maybe<Scalars["String"]>;
};

export type SiteBuildMetadataConnection = {
  readonly __typename?: "SiteBuildMetadataConnection";
  readonly distinct: ReadonlyArray<Scalars["String"]>;
  readonly edges: ReadonlyArray<SiteBuildMetadataEdge>;
  readonly group: ReadonlyArray<SiteBuildMetadataGroupConnection>;
  readonly max: Maybe<Scalars["Float"]>;
  readonly min: Maybe<Scalars["Float"]>;
  readonly nodes: ReadonlyArray<SiteBuildMetadata>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars["Float"]>;
  readonly totalCount: Scalars["Int"];
};

export type SiteBuildMetadataConnectionDistinctArgs = {
  field: SiteBuildMetadataFieldsEnum;
};

export type SiteBuildMetadataConnectionGroupArgs = {
  field: SiteBuildMetadataFieldsEnum;
  limit: Maybe<Scalars["Int"]>;
  skip: Maybe<Scalars["Int"]>;
};

export type SiteBuildMetadataConnectionMaxArgs = {
  field: SiteBuildMetadataFieldsEnum;
};

export type SiteBuildMetadataConnectionMinArgs = {
  field: SiteBuildMetadataFieldsEnum;
};

export type SiteBuildMetadataConnectionSumArgs = {
  field: SiteBuildMetadataFieldsEnum;
};

export type SiteBuildMetadataEdge = {
  readonly __typename?: "SiteBuildMetadataEdge";
  readonly next: Maybe<SiteBuildMetadata>;
  readonly node: SiteBuildMetadata;
  readonly previous: Maybe<SiteBuildMetadata>;
};

export enum SiteBuildMetadataFieldsEnum {
  BuildTime = "buildTime",
  Children = "children",
  ChildrenChildren = "children___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenId = "children___id",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentParentId = "children___parent___parent___id",
  Id = "id",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
  ParentChildren = "parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenId = "parent___children___id",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentId = "parent___id",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentId = "parent___parent___id",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentParentId = "parent___parent___parent___id",
}

export type SiteBuildMetadataFilterInput = {
  readonly buildTime: Maybe<DateQueryOperatorInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly internal: Maybe<InternalFilterInput>;
  readonly parent: Maybe<NodeFilterInput>;
};

export type SiteBuildMetadataGroupConnection = {
  readonly __typename?: "SiteBuildMetadataGroupConnection";
  readonly edges: ReadonlyArray<SiteBuildMetadataEdge>;
  readonly field: Scalars["String"];
  readonly fieldValue: Maybe<Scalars["String"]>;
  readonly nodes: ReadonlyArray<SiteBuildMetadata>;
  readonly pageInfo: PageInfo;
  readonly totalCount: Scalars["Int"];
};

export type SiteBuildMetadataSortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<SiteBuildMetadataFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};

export type SiteConnection = {
  readonly __typename?: "SiteConnection";
  readonly distinct: ReadonlyArray<Scalars["String"]>;
  readonly edges: ReadonlyArray<SiteEdge>;
  readonly group: ReadonlyArray<SiteGroupConnection>;
  readonly max: Maybe<Scalars["Float"]>;
  readonly min: Maybe<Scalars["Float"]>;
  readonly nodes: ReadonlyArray<Site>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars["Float"]>;
  readonly totalCount: Scalars["Int"];
};

export type SiteConnectionDistinctArgs = {
  field: SiteFieldsEnum;
};

export type SiteConnectionGroupArgs = {
  field: SiteFieldsEnum;
  limit: Maybe<Scalars["Int"]>;
  skip: Maybe<Scalars["Int"]>;
};

export type SiteConnectionMaxArgs = {
  field: SiteFieldsEnum;
};

export type SiteConnectionMinArgs = {
  field: SiteFieldsEnum;
};

export type SiteConnectionSumArgs = {
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
  Children = "children",
  ChildrenChildren = "children___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenId = "children___id",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentParentId = "children___parent___parent___id",
  FlagsPreserveFileDownloadCache = "flags___PRESERVE_FILE_DOWNLOAD_CACHE",
  Host = "host",
  Id = "id",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
  ParentChildren = "parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenId = "parent___children___id",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentId = "parent___id",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentId = "parent___parent___id",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentParentId = "parent___parent___parent___id",
  PathPrefix = "pathPrefix",
  Polyfill = "polyfill",
  Port = "port",
  SiteMetadataAuthorName = "siteMetadata___author___name",
  SiteMetadataDescription = "siteMetadata___description",
  SiteMetadataDisqus = "siteMetadata___disqus",
  SiteMetadataLanguage = "siteMetadata___language",
  SiteMetadataRepository = "siteMetadata___repository",
  SiteMetadataRss = "siteMetadata___rss",
  SiteMetadataSiteUrl = "siteMetadata___siteUrl",
  SiteMetadataSocial = "siteMetadata___social",
  SiteMetadataSocialName = "siteMetadata___social___name",
  SiteMetadataSocialUrl = "siteMetadata___social___url",
  SiteMetadataTitle = "siteMetadata___title",
}

export type SiteFilterInput = {
  readonly buildTime: Maybe<DateQueryOperatorInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly flags: Maybe<SiteFlagsFilterInput>;
  readonly host: Maybe<StringQueryOperatorInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly internal: Maybe<InternalFilterInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly pathPrefix: Maybe<StringQueryOperatorInput>;
  readonly polyfill: Maybe<BooleanQueryOperatorInput>;
  readonly port: Maybe<IntQueryOperatorInput>;
  readonly siteMetadata: Maybe<SiteSiteMetadataFilterInput>;
};

export type SiteFlags = {
  readonly __typename?: "SiteFlags";
  readonly PRESERVE_FILE_DOWNLOAD_CACHE: Maybe<Scalars["Boolean"]>;
};

export type SiteFlagsFilterInput = {
  readonly PRESERVE_FILE_DOWNLOAD_CACHE: Maybe<BooleanQueryOperatorInput>;
};

export type SiteFunction = Node & {
  readonly __typename?: "SiteFunction";
  readonly absoluteCompiledFilePath: Scalars["String"];
  readonly children: ReadonlyArray<Node>;
  readonly functionRoute: Scalars["String"];
  readonly id: Scalars["ID"];
  readonly internal: Internal;
  readonly matchPath: Maybe<Scalars["String"]>;
  readonly originalAbsoluteFilePath: Scalars["String"];
  readonly originalRelativeFilePath: Scalars["String"];
  readonly parent: Maybe<Node>;
  readonly pluginName: Scalars["String"];
  readonly relativeCompiledFilePath: Scalars["String"];
};

export type SiteFunctionConnection = {
  readonly __typename?: "SiteFunctionConnection";
  readonly distinct: ReadonlyArray<Scalars["String"]>;
  readonly edges: ReadonlyArray<SiteFunctionEdge>;
  readonly group: ReadonlyArray<SiteFunctionGroupConnection>;
  readonly max: Maybe<Scalars["Float"]>;
  readonly min: Maybe<Scalars["Float"]>;
  readonly nodes: ReadonlyArray<SiteFunction>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars["Float"]>;
  readonly totalCount: Scalars["Int"];
};

export type SiteFunctionConnectionDistinctArgs = {
  field: SiteFunctionFieldsEnum;
};

export type SiteFunctionConnectionGroupArgs = {
  field: SiteFunctionFieldsEnum;
  limit: Maybe<Scalars["Int"]>;
  skip: Maybe<Scalars["Int"]>;
};

export type SiteFunctionConnectionMaxArgs = {
  field: SiteFunctionFieldsEnum;
};

export type SiteFunctionConnectionMinArgs = {
  field: SiteFunctionFieldsEnum;
};

export type SiteFunctionConnectionSumArgs = {
  field: SiteFunctionFieldsEnum;
};

export type SiteFunctionEdge = {
  readonly __typename?: "SiteFunctionEdge";
  readonly next: Maybe<SiteFunction>;
  readonly node: SiteFunction;
  readonly previous: Maybe<SiteFunction>;
};

export enum SiteFunctionFieldsEnum {
  AbsoluteCompiledFilePath = "absoluteCompiledFilePath",
  Children = "children",
  ChildrenChildren = "children___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenId = "children___id",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentParentId = "children___parent___parent___id",
  FunctionRoute = "functionRoute",
  Id = "id",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
  MatchPath = "matchPath",
  OriginalAbsoluteFilePath = "originalAbsoluteFilePath",
  OriginalRelativeFilePath = "originalRelativeFilePath",
  ParentChildren = "parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenId = "parent___children___id",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentId = "parent___id",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentId = "parent___parent___id",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentParentId = "parent___parent___parent___id",
  PluginName = "pluginName",
  RelativeCompiledFilePath = "relativeCompiledFilePath",
}

export type SiteFunctionFilterInput = {
  readonly absoluteCompiledFilePath: Maybe<StringQueryOperatorInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly functionRoute: Maybe<StringQueryOperatorInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly internal: Maybe<InternalFilterInput>;
  readonly matchPath: Maybe<StringQueryOperatorInput>;
  readonly originalAbsoluteFilePath: Maybe<StringQueryOperatorInput>;
  readonly originalRelativeFilePath: Maybe<StringQueryOperatorInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly pluginName: Maybe<StringQueryOperatorInput>;
  readonly relativeCompiledFilePath: Maybe<StringQueryOperatorInput>;
};

export type SiteFunctionGroupConnection = {
  readonly __typename?: "SiteFunctionGroupConnection";
  readonly edges: ReadonlyArray<SiteFunctionEdge>;
  readonly field: Scalars["String"];
  readonly fieldValue: Maybe<Scalars["String"]>;
  readonly nodes: ReadonlyArray<SiteFunction>;
  readonly pageInfo: PageInfo;
  readonly totalCount: Scalars["Int"];
};

export type SiteFunctionSortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<SiteFunctionFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};

export type SiteGroupConnection = {
  readonly __typename?: "SiteGroupConnection";
  readonly edges: ReadonlyArray<SiteEdge>;
  readonly field: Scalars["String"];
  readonly fieldValue: Maybe<Scalars["String"]>;
  readonly nodes: ReadonlyArray<Site>;
  readonly pageInfo: PageInfo;
  readonly totalCount: Scalars["Int"];
};

export type SitePage = Node & {
  readonly __typename?: "SitePage";
  readonly children: ReadonlyArray<Node>;
  readonly component: Scalars["String"];
  readonly componentChunkName: Scalars["String"];
  readonly id: Scalars["ID"];
  readonly internal: Internal;
  readonly internalComponentName: Scalars["String"];
  readonly matchPath: Maybe<Scalars["String"]>;
  readonly parent: Maybe<Node>;
  readonly path: Scalars["String"];
};

export type SitePageConnection = {
  readonly __typename?: "SitePageConnection";
  readonly distinct: ReadonlyArray<Scalars["String"]>;
  readonly edges: ReadonlyArray<SitePageEdge>;
  readonly group: ReadonlyArray<SitePageGroupConnection>;
  readonly max: Maybe<Scalars["Float"]>;
  readonly min: Maybe<Scalars["Float"]>;
  readonly nodes: ReadonlyArray<SitePage>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars["Float"]>;
  readonly totalCount: Scalars["Int"];
};

export type SitePageConnectionDistinctArgs = {
  field: SitePageFieldsEnum;
};

export type SitePageConnectionGroupArgs = {
  field: SitePageFieldsEnum;
  limit: Maybe<Scalars["Int"]>;
  skip: Maybe<Scalars["Int"]>;
};

export type SitePageConnectionMaxArgs = {
  field: SitePageFieldsEnum;
};

export type SitePageConnectionMinArgs = {
  field: SitePageFieldsEnum;
};

export type SitePageConnectionSumArgs = {
  field: SitePageFieldsEnum;
};

export type SitePageEdge = {
  readonly __typename?: "SitePageEdge";
  readonly next: Maybe<SitePage>;
  readonly node: SitePage;
  readonly previous: Maybe<SitePage>;
};

export enum SitePageFieldsEnum {
  Children = "children",
  ChildrenChildren = "children___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenId = "children___id",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentParentId = "children___parent___parent___id",
  Component = "component",
  ComponentChunkName = "componentChunkName",
  Id = "id",
  InternalComponentName = "internalComponentName",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
  MatchPath = "matchPath",
  ParentChildren = "parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenId = "parent___children___id",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentId = "parent___id",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentId = "parent___parent___id",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentParentId = "parent___parent___parent___id",
  Path = "path",
}

export type SitePageFilterInput = {
  readonly children: Maybe<NodeFilterListInput>;
  readonly component: Maybe<StringQueryOperatorInput>;
  readonly componentChunkName: Maybe<StringQueryOperatorInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly internal: Maybe<InternalFilterInput>;
  readonly internalComponentName: Maybe<StringQueryOperatorInput>;
  readonly matchPath: Maybe<StringQueryOperatorInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly path: Maybe<StringQueryOperatorInput>;
};

export type SitePageGroupConnection = {
  readonly __typename?: "SitePageGroupConnection";
  readonly edges: ReadonlyArray<SitePageEdge>;
  readonly field: Scalars["String"];
  readonly fieldValue: Maybe<Scalars["String"]>;
  readonly nodes: ReadonlyArray<SitePage>;
  readonly pageInfo: PageInfo;
  readonly totalCount: Scalars["Int"];
};

export type SitePageSortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<SitePageFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};

export type SitePlugin = Node & {
  readonly __typename?: "SitePlugin";
  readonly browserAPIs: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
  readonly children: ReadonlyArray<Node>;
  readonly id: Scalars["ID"];
  readonly internal: Internal;
  readonly name: Maybe<Scalars["String"]>;
  readonly nodeAPIs: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
  readonly packageJson: Maybe<SitePluginPackageJson>;
  readonly parent: Maybe<Node>;
  readonly pluginFilepath: Maybe<Scalars["String"]>;
  readonly pluginOptions: Maybe<SitePluginPluginOptions>;
  readonly resolve: Maybe<Scalars["String"]>;
  readonly ssrAPIs: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
  readonly version: Maybe<Scalars["String"]>;
};

export type SitePluginConnection = {
  readonly __typename?: "SitePluginConnection";
  readonly distinct: ReadonlyArray<Scalars["String"]>;
  readonly edges: ReadonlyArray<SitePluginEdge>;
  readonly group: ReadonlyArray<SitePluginGroupConnection>;
  readonly max: Maybe<Scalars["Float"]>;
  readonly min: Maybe<Scalars["Float"]>;
  readonly nodes: ReadonlyArray<SitePlugin>;
  readonly pageInfo: PageInfo;
  readonly sum: Maybe<Scalars["Float"]>;
  readonly totalCount: Scalars["Int"];
};

export type SitePluginConnectionDistinctArgs = {
  field: SitePluginFieldsEnum;
};

export type SitePluginConnectionGroupArgs = {
  field: SitePluginFieldsEnum;
  limit: Maybe<Scalars["Int"]>;
  skip: Maybe<Scalars["Int"]>;
};

export type SitePluginConnectionMaxArgs = {
  field: SitePluginFieldsEnum;
};

export type SitePluginConnectionMinArgs = {
  field: SitePluginFieldsEnum;
};

export type SitePluginConnectionSumArgs = {
  field: SitePluginFieldsEnum;
};

export type SitePluginEdge = {
  readonly __typename?: "SitePluginEdge";
  readonly next: Maybe<SitePlugin>;
  readonly node: SitePlugin;
  readonly previous: Maybe<SitePlugin>;
};

export enum SitePluginFieldsEnum {
  BrowserApIs = "browserAPIs",
  Children = "children",
  ChildrenChildren = "children___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenId = "children___id",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentParentId = "children___parent___parent___id",
  Id = "id",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
  Name = "name",
  NodeApIs = "nodeAPIs",
  PackageJsonAuthor = "packageJson___author",
  PackageJsonDependencies = "packageJson___dependencies",
  PackageJsonDependenciesName = "packageJson___dependencies___name",
  PackageJsonDependenciesVersion = "packageJson___dependencies___version",
  PackageJsonDescription = "packageJson___description",
  PackageJsonDevDependencies = "packageJson___devDependencies",
  PackageJsonDevDependenciesName = "packageJson___devDependencies___name",
  PackageJsonDevDependenciesVersion = "packageJson___devDependencies___version",
  PackageJsonKeywords = "packageJson___keywords",
  PackageJsonLicense = "packageJson___license",
  PackageJsonMain = "packageJson___main",
  PackageJsonName = "packageJson___name",
  PackageJsonPeerDependencies = "packageJson___peerDependencies",
  PackageJsonPeerDependenciesName = "packageJson___peerDependencies___name",
  PackageJsonPeerDependenciesVersion = "packageJson___peerDependencies___version",
  PackageJsonVersion = "packageJson___version",
  ParentChildren = "parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenId = "parent___children___id",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentId = "parent___id",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentId = "parent___parent___id",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentParentId = "parent___parent___parent___id",
  PluginFilepath = "pluginFilepath",
  PluginOptionsAllExtensions = "pluginOptions___allExtensions",
  PluginOptionsBackgroundColor = "pluginOptions___backgroundColor",
  PluginOptionsBase64Width = "pluginOptions___base64Width",
  PluginOptionsCacheDigest = "pluginOptions___cacheDigest",
  PluginOptionsCacheBustingMode = "pluginOptions___cache_busting_mode",
  PluginOptionsClassName = "pluginOptions___className",
  PluginOptionsCreateLinkInHead = "pluginOptions___createLinkInHead",
  PluginOptionsCrossOrigin = "pluginOptions___crossOrigin",
  PluginOptionsDecoding = "pluginOptions___decoding",
  PluginOptionsDefaultQuality = "pluginOptions___defaultQuality",
  PluginOptionsDisableBgImage = "pluginOptions___disableBgImage",
  PluginOptionsDisableBgImageOnAlpha = "pluginOptions___disableBgImageOnAlpha",
  PluginOptionsDisplay = "pluginOptions___display",
  PluginOptionsEntryLimit = "pluginOptions___entryLimit",
  PluginOptionsFailOnError = "pluginOptions___failOnError",
  PluginOptionsFeeds = "pluginOptions___feeds",
  PluginOptionsFeedsMatch = "pluginOptions___feeds___match",
  PluginOptionsFeedsOutput = "pluginOptions___feeds___output",
  PluginOptionsFeedsQuery = "pluginOptions___feeds___query",
  PluginOptionsFeedsTitle = "pluginOptions___feeds___title",
  PluginOptionsIncludeFavicon = "pluginOptions___include_favicon",
  PluginOptionsIsTsx = "pluginOptions___isTSX",
  PluginOptionsJsxPragma = "pluginOptions___jsxPragma",
  PluginOptionsLegacy = "pluginOptions___legacy",
  PluginOptionsLinkImagesToOriginal = "pluginOptions___linkImagesToOriginal",
  PluginOptionsLoading = "pluginOptions___loading",
  PluginOptionsMarkdownCaptions = "pluginOptions___markdownCaptions",
  PluginOptionsMaxWidth = "pluginOptions___maxWidth",
  PluginOptionsName = "pluginOptions___name",
  PluginOptionsOffsetY = "pluginOptions___offsetY",
  PluginOptionsOutput = "pluginOptions___output",
  PluginOptionsPath = "pluginOptions___path",
  PluginOptionsPathCheck = "pluginOptions___pathCheck",
  PluginOptionsPlugins = "pluginOptions___plugins",
  PluginOptionsPluginsBrowserApIs = "pluginOptions___plugins___browserAPIs",
  PluginOptionsPluginsId = "pluginOptions___plugins___id",
  PluginOptionsPluginsName = "pluginOptions___plugins___name",
  PluginOptionsPluginsNodeApIs = "pluginOptions___plugins___nodeAPIs",
  PluginOptionsPluginsPluginFilepath = "pluginOptions___plugins___pluginFilepath",
  PluginOptionsPluginsPluginOptionsBackgroundColor = "pluginOptions___plugins___pluginOptions___backgroundColor",
  PluginOptionsPluginsPluginOptionsClassName = "pluginOptions___plugins___pluginOptions___className",
  PluginOptionsPluginsPluginOptionsDecoding = "pluginOptions___plugins___pluginOptions___decoding",
  PluginOptionsPluginsPluginOptionsDisableBgImage = "pluginOptions___plugins___pluginOptions___disableBgImage",
  PluginOptionsPluginsPluginOptionsDisableBgImageOnAlpha = "pluginOptions___plugins___pluginOptions___disableBgImageOnAlpha",
  PluginOptionsPluginsPluginOptionsIcon = "pluginOptions___plugins___pluginOptions___icon",
  PluginOptionsPluginsPluginOptionsLinkImagesToOriginal = "pluginOptions___plugins___pluginOptions___linkImagesToOriginal",
  PluginOptionsPluginsPluginOptionsLoading = "pluginOptions___plugins___pluginOptions___loading",
  PluginOptionsPluginsPluginOptionsMarkdownCaptions = "pluginOptions___plugins___pluginOptions___markdownCaptions",
  PluginOptionsPluginsPluginOptionsMaxWidth = "pluginOptions___plugins___pluginOptions___maxWidth",
  PluginOptionsPluginsPluginOptionsOffsetY = "pluginOptions___plugins___pluginOptions___offsetY",
  PluginOptionsPluginsPluginOptionsQuality = "pluginOptions___plugins___pluginOptions___quality",
  PluginOptionsPluginsPluginOptionsShowCaptions = "pluginOptions___plugins___pluginOptions___showCaptions",
  PluginOptionsPluginsPluginOptionsSizeByPixelDensity = "pluginOptions___plugins___pluginOptions___sizeByPixelDensity",
  PluginOptionsPluginsPluginOptionsTracedSvg = "pluginOptions___plugins___pluginOptions___tracedSVG",
  PluginOptionsPluginsPluginOptionsWithWebp = "pluginOptions___plugins___pluginOptions___withWebp",
  PluginOptionsPluginsPluginOptionsWrapperStyle = "pluginOptions___plugins___pluginOptions___wrapperStyle",
  PluginOptionsPluginsResolve = "pluginOptions___plugins___resolve",
  PluginOptionsPluginsSsrApIs = "pluginOptions___plugins___ssrAPIs",
  PluginOptionsPluginsVersion = "pluginOptions___plugins___version",
  PluginOptionsPolicy = "pluginOptions___policy",
  PluginOptionsPolicyAllow = "pluginOptions___policy___allow",
  PluginOptionsPolicyUserAgent = "pluginOptions___policy___userAgent",
  PluginOptionsQuality = "pluginOptions___quality",
  PluginOptionsQuery = "pluginOptions___query",
  PluginOptionsSassOptionsIncludePaths = "pluginOptions___sassOptions___includePaths",
  PluginOptionsSassOptionsIndentType = "pluginOptions___sassOptions___indentType",
  PluginOptionsSassOptionsIndentWidth = "pluginOptions___sassOptions___indentWidth",
  PluginOptionsSassOptionsIndentedSyntax = "pluginOptions___sassOptions___indentedSyntax",
  PluginOptionsSassOptionsLinefeed = "pluginOptions___sassOptions___linefeed",
  PluginOptionsSassOptionsOmitSourceMapUrl = "pluginOptions___sassOptions___omitSourceMapUrl",
  PluginOptionsSassOptionsPrecision = "pluginOptions___sassOptions___precision",
  PluginOptionsSassOptionsSourceComments = "pluginOptions___sassOptions___sourceComments",
  PluginOptionsSassOptionsSourceMapContents = "pluginOptions___sassOptions___sourceMapContents",
  PluginOptionsSassOptionsSourceMapEmbed = "pluginOptions___sassOptions___sourceMapEmbed",
  PluginOptionsShortName = "pluginOptions___short_name",
  PluginOptionsShowCaptions = "pluginOptions___showCaptions",
  PluginOptionsSizeByPixelDensity = "pluginOptions___sizeByPixelDensity",
  PluginOptionsStartUrl = "pluginOptions___start_url",
  PluginOptionsStripMetadata = "pluginOptions___stripMetadata",
  PluginOptionsThemeColor = "pluginOptions___theme_color",
  PluginOptionsThemeColorInHead = "pluginOptions___theme_color_in_head",
  PluginOptionsTracedSvg = "pluginOptions___tracedSVG",
  PluginOptionsWithWebp = "pluginOptions___withWebp",
  PluginOptionsWrapperStyle = "pluginOptions___wrapperStyle",
  Resolve = "resolve",
  SsrApIs = "ssrAPIs",
  Version = "version",
}

export type SitePluginFilterInput = {
  readonly browserAPIs: Maybe<StringQueryOperatorInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly internal: Maybe<InternalFilterInput>;
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly nodeAPIs: Maybe<StringQueryOperatorInput>;
  readonly packageJson: Maybe<SitePluginPackageJsonFilterInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly pluginFilepath: Maybe<StringQueryOperatorInput>;
  readonly pluginOptions: Maybe<SitePluginPluginOptionsFilterInput>;
  readonly resolve: Maybe<StringQueryOperatorInput>;
  readonly ssrAPIs: Maybe<StringQueryOperatorInput>;
  readonly version: Maybe<StringQueryOperatorInput>;
};

export type SitePluginGroupConnection = {
  readonly __typename?: "SitePluginGroupConnection";
  readonly edges: ReadonlyArray<SitePluginEdge>;
  readonly field: Scalars["String"];
  readonly fieldValue: Maybe<Scalars["String"]>;
  readonly nodes: ReadonlyArray<SitePlugin>;
  readonly pageInfo: PageInfo;
  readonly totalCount: Scalars["Int"];
};

export type SitePluginPackageJson = {
  readonly __typename?: "SitePluginPackageJson";
  readonly author: Maybe<Scalars["String"]>;
  readonly dependencies: Maybe<
    ReadonlyArray<Maybe<SitePluginPackageJsonDependencies>>
  >;
  readonly description: Maybe<Scalars["String"]>;
  readonly devDependencies: Maybe<
    ReadonlyArray<Maybe<SitePluginPackageJsonDevDependencies>>
  >;
  readonly keywords: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
  readonly license: Maybe<Scalars["String"]>;
  readonly main: Maybe<Scalars["String"]>;
  readonly name: Maybe<Scalars["String"]>;
  readonly peerDependencies: Maybe<
    ReadonlyArray<Maybe<SitePluginPackageJsonPeerDependencies>>
  >;
  readonly version: Maybe<Scalars["String"]>;
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
  readonly author: Maybe<StringQueryOperatorInput>;
  readonly dependencies: Maybe<SitePluginPackageJsonDependenciesFilterListInput>;
  readonly description: Maybe<StringQueryOperatorInput>;
  readonly devDependencies: Maybe<SitePluginPackageJsonDevDependenciesFilterListInput>;
  readonly keywords: Maybe<StringQueryOperatorInput>;
  readonly license: Maybe<StringQueryOperatorInput>;
  readonly main: Maybe<StringQueryOperatorInput>;
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly peerDependencies: Maybe<SitePluginPackageJsonPeerDependenciesFilterListInput>;
  readonly version: Maybe<StringQueryOperatorInput>;
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
  readonly allExtensions: Maybe<Scalars["Boolean"]>;
  readonly backgroundColor: Maybe<Scalars["String"]>;
  readonly background_color: Maybe<Scalars["String"]>;
  readonly base64Width: Maybe<Scalars["Int"]>;
  readonly cacheDigest: Maybe<Scalars["String"]>;
  readonly cache_busting_mode: Maybe<Scalars["String"]>;
  readonly className: Maybe<Scalars["String"]>;
  readonly createLinkInHead: Maybe<Scalars["Boolean"]>;
  readonly crossOrigin: Maybe<Scalars["String"]>;
  readonly decoding: Maybe<Scalars["String"]>;
  readonly defaultQuality: Maybe<Scalars["Int"]>;
  readonly disableBgImage: Maybe<Scalars["Boolean"]>;
  readonly disableBgImageOnAlpha: Maybe<Scalars["Boolean"]>;
  readonly display: Maybe<Scalars["String"]>;
  readonly entryLimit: Maybe<Scalars["Int"]>;
  readonly failOnError: Maybe<Scalars["Boolean"]>;
  readonly feeds: Maybe<ReadonlyArray<Maybe<SitePluginPluginOptionsFeeds>>>;
  readonly include_favicon: Maybe<Scalars["Boolean"]>;
  readonly isTSX: Maybe<Scalars["Boolean"]>;
  readonly jsxPragma: Maybe<Scalars["String"]>;
  readonly legacy: Maybe<Scalars["Boolean"]>;
  readonly linkImagesToOriginal: Maybe<Scalars["Boolean"]>;
  readonly loading: Maybe<Scalars["String"]>;
  readonly markdownCaptions: Maybe<Scalars["Boolean"]>;
  readonly maxWidth: Maybe<Scalars["Int"]>;
  readonly name: Maybe<Scalars["String"]>;
  readonly offsetY: Maybe<Scalars["Int"]>;
  readonly output: Maybe<Scalars["String"]>;
  readonly path: Maybe<Scalars["String"]>;
  readonly pathCheck: Maybe<Scalars["Boolean"]>;
  readonly plugins: Maybe<ReadonlyArray<Maybe<SitePluginPluginOptionsPlugins>>>;
  readonly policy: Maybe<ReadonlyArray<Maybe<SitePluginPluginOptionsPolicy>>>;
  readonly quality: Maybe<Scalars["Int"]>;
  readonly query: Maybe<Scalars["String"]>;
  readonly sassOptions: Maybe<SitePluginPluginOptionsSassOptions>;
  readonly short_name: Maybe<Scalars["String"]>;
  readonly showCaptions: Maybe<Scalars["Boolean"]>;
  readonly sizeByPixelDensity: Maybe<Scalars["Boolean"]>;
  readonly start_url: Maybe<Scalars["String"]>;
  readonly stripMetadata: Maybe<Scalars["Boolean"]>;
  readonly theme_color: Maybe<Scalars["String"]>;
  readonly theme_color_in_head: Maybe<Scalars["Boolean"]>;
  readonly tracedSVG: Maybe<Scalars["Boolean"]>;
  readonly withWebp: Maybe<Scalars["Boolean"]>;
  readonly wrapperStyle: Maybe<Scalars["String"]>;
};

export type SitePluginPluginOptionsFeeds = {
  readonly __typename?: "SitePluginPluginOptionsFeeds";
  readonly match: Maybe<Scalars["String"]>;
  readonly output: Maybe<Scalars["String"]>;
  readonly query: Maybe<Scalars["String"]>;
  readonly title: Maybe<Scalars["String"]>;
};

export type SitePluginPluginOptionsFeedsFilterInput = {
  readonly match: Maybe<StringQueryOperatorInput>;
  readonly output: Maybe<StringQueryOperatorInput>;
  readonly query: Maybe<StringQueryOperatorInput>;
  readonly title: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPluginOptionsFeedsFilterListInput = {
  readonly elemMatch: Maybe<SitePluginPluginOptionsFeedsFilterInput>;
};

export type SitePluginPluginOptionsFilterInput = {
  readonly allExtensions: Maybe<BooleanQueryOperatorInput>;
  readonly backgroundColor: Maybe<StringQueryOperatorInput>;
  readonly background_color: Maybe<StringQueryOperatorInput>;
  readonly base64Width: Maybe<IntQueryOperatorInput>;
  readonly cacheDigest: Maybe<StringQueryOperatorInput>;
  readonly cache_busting_mode: Maybe<StringQueryOperatorInput>;
  readonly className: Maybe<StringQueryOperatorInput>;
  readonly createLinkInHead: Maybe<BooleanQueryOperatorInput>;
  readonly crossOrigin: Maybe<StringQueryOperatorInput>;
  readonly decoding: Maybe<StringQueryOperatorInput>;
  readonly defaultQuality: Maybe<IntQueryOperatorInput>;
  readonly disableBgImage: Maybe<BooleanQueryOperatorInput>;
  readonly disableBgImageOnAlpha: Maybe<BooleanQueryOperatorInput>;
  readonly display: Maybe<StringQueryOperatorInput>;
  readonly entryLimit: Maybe<IntQueryOperatorInput>;
  readonly failOnError: Maybe<BooleanQueryOperatorInput>;
  readonly feeds: Maybe<SitePluginPluginOptionsFeedsFilterListInput>;
  readonly include_favicon: Maybe<BooleanQueryOperatorInput>;
  readonly isTSX: Maybe<BooleanQueryOperatorInput>;
  readonly jsxPragma: Maybe<StringQueryOperatorInput>;
  readonly legacy: Maybe<BooleanQueryOperatorInput>;
  readonly linkImagesToOriginal: Maybe<BooleanQueryOperatorInput>;
  readonly loading: Maybe<StringQueryOperatorInput>;
  readonly markdownCaptions: Maybe<BooleanQueryOperatorInput>;
  readonly maxWidth: Maybe<IntQueryOperatorInput>;
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly offsetY: Maybe<IntQueryOperatorInput>;
  readonly output: Maybe<StringQueryOperatorInput>;
  readonly path: Maybe<StringQueryOperatorInput>;
  readonly pathCheck: Maybe<BooleanQueryOperatorInput>;
  readonly plugins: Maybe<SitePluginPluginOptionsPluginsFilterListInput>;
  readonly policy: Maybe<SitePluginPluginOptionsPolicyFilterListInput>;
  readonly quality: Maybe<IntQueryOperatorInput>;
  readonly query: Maybe<StringQueryOperatorInput>;
  readonly sassOptions: Maybe<SitePluginPluginOptionsSassOptionsFilterInput>;
  readonly short_name: Maybe<StringQueryOperatorInput>;
  readonly showCaptions: Maybe<BooleanQueryOperatorInput>;
  readonly sizeByPixelDensity: Maybe<BooleanQueryOperatorInput>;
  readonly start_url: Maybe<StringQueryOperatorInput>;
  readonly stripMetadata: Maybe<BooleanQueryOperatorInput>;
  readonly theme_color: Maybe<StringQueryOperatorInput>;
  readonly theme_color_in_head: Maybe<BooleanQueryOperatorInput>;
  readonly tracedSVG: Maybe<BooleanQueryOperatorInput>;
  readonly withWebp: Maybe<BooleanQueryOperatorInput>;
  readonly wrapperStyle: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPluginOptionsPlugins = {
  readonly __typename?: "SitePluginPluginOptionsPlugins";
  readonly browserAPIs: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
  readonly id: Maybe<Scalars["String"]>;
  readonly name: Maybe<Scalars["String"]>;
  readonly nodeAPIs: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
  readonly pluginFilepath: Maybe<Scalars["String"]>;
  readonly pluginOptions: Maybe<SitePluginPluginOptionsPluginsPluginOptions>;
  readonly resolve: Maybe<Scalars["String"]>;
  readonly ssrAPIs: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
  readonly version: Maybe<Scalars["String"]>;
};

export type SitePluginPluginOptionsPluginsFilterInput = {
  readonly browserAPIs: Maybe<StringQueryOperatorInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly nodeAPIs: Maybe<StringQueryOperatorInput>;
  readonly pluginFilepath: Maybe<StringQueryOperatorInput>;
  readonly pluginOptions: Maybe<SitePluginPluginOptionsPluginsPluginOptionsFilterInput>;
  readonly resolve: Maybe<StringQueryOperatorInput>;
  readonly ssrAPIs: Maybe<StringQueryOperatorInput>;
  readonly version: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPluginOptionsPluginsFilterListInput = {
  readonly elemMatch: Maybe<SitePluginPluginOptionsPluginsFilterInput>;
};

export type SitePluginPluginOptionsPluginsPluginOptions = {
  readonly __typename?: "SitePluginPluginOptionsPluginsPluginOptions";
  readonly backgroundColor: Maybe<Scalars["String"]>;
  readonly className: Maybe<Scalars["String"]>;
  readonly decoding: Maybe<Scalars["String"]>;
  readonly disableBgImage: Maybe<Scalars["Boolean"]>;
  readonly disableBgImageOnAlpha: Maybe<Scalars["Boolean"]>;
  readonly icon: Maybe<Scalars["Boolean"]>;
  readonly linkImagesToOriginal: Maybe<Scalars["Boolean"]>;
  readonly loading: Maybe<Scalars["String"]>;
  readonly markdownCaptions: Maybe<Scalars["Boolean"]>;
  readonly maxWidth: Maybe<Scalars["Int"]>;
  readonly offsetY: Maybe<Scalars["Int"]>;
  readonly quality: Maybe<Scalars["Int"]>;
  readonly showCaptions: Maybe<Scalars["Boolean"]>;
  readonly sizeByPixelDensity: Maybe<Scalars["Boolean"]>;
  readonly tracedSVG: Maybe<Scalars["Boolean"]>;
  readonly withWebp: Maybe<Scalars["Boolean"]>;
  readonly wrapperStyle: Maybe<Scalars["String"]>;
};

export type SitePluginPluginOptionsPluginsPluginOptionsFilterInput = {
  readonly backgroundColor: Maybe<StringQueryOperatorInput>;
  readonly className: Maybe<StringQueryOperatorInput>;
  readonly decoding: Maybe<StringQueryOperatorInput>;
  readonly disableBgImage: Maybe<BooleanQueryOperatorInput>;
  readonly disableBgImageOnAlpha: Maybe<BooleanQueryOperatorInput>;
  readonly icon: Maybe<BooleanQueryOperatorInput>;
  readonly linkImagesToOriginal: Maybe<BooleanQueryOperatorInput>;
  readonly loading: Maybe<StringQueryOperatorInput>;
  readonly markdownCaptions: Maybe<BooleanQueryOperatorInput>;
  readonly maxWidth: Maybe<IntQueryOperatorInput>;
  readonly offsetY: Maybe<IntQueryOperatorInput>;
  readonly quality: Maybe<IntQueryOperatorInput>;
  readonly showCaptions: Maybe<BooleanQueryOperatorInput>;
  readonly sizeByPixelDensity: Maybe<BooleanQueryOperatorInput>;
  readonly tracedSVG: Maybe<BooleanQueryOperatorInput>;
  readonly withWebp: Maybe<BooleanQueryOperatorInput>;
  readonly wrapperStyle: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPluginOptionsPolicy = {
  readonly __typename?: "SitePluginPluginOptionsPolicy";
  readonly allow: Maybe<Scalars["String"]>;
  readonly userAgent: Maybe<Scalars["String"]>;
};

export type SitePluginPluginOptionsPolicyFilterInput = {
  readonly allow: Maybe<StringQueryOperatorInput>;
  readonly userAgent: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPluginOptionsPolicyFilterListInput = {
  readonly elemMatch: Maybe<SitePluginPluginOptionsPolicyFilterInput>;
};

export type SitePluginPluginOptionsSassOptions = {
  readonly __typename?: "SitePluginPluginOptionsSassOptions";
  readonly includePaths: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
  readonly indentType: Maybe<Scalars["String"]>;
  readonly indentWidth: Maybe<Scalars["Int"]>;
  readonly indentedSyntax: Maybe<Scalars["Boolean"]>;
  readonly linefeed: Maybe<Scalars["String"]>;
  readonly omitSourceMapUrl: Maybe<Scalars["Boolean"]>;
  readonly precision: Maybe<Scalars["Int"]>;
  readonly sourceComments: Maybe<Scalars["Boolean"]>;
  readonly sourceMapContents: Maybe<Scalars["Boolean"]>;
  readonly sourceMapEmbed: Maybe<Scalars["Boolean"]>;
};

export type SitePluginPluginOptionsSassOptionsFilterInput = {
  readonly includePaths: Maybe<StringQueryOperatorInput>;
  readonly indentType: Maybe<StringQueryOperatorInput>;
  readonly indentWidth: Maybe<IntQueryOperatorInput>;
  readonly indentedSyntax: Maybe<BooleanQueryOperatorInput>;
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
  readonly author: Maybe<SiteSiteMetadataAuthor>;
  readonly description: Maybe<Scalars["String"]>;
  readonly disqus: Maybe<Scalars["String"]>;
  readonly language: Maybe<Scalars["String"]>;
  readonly repository: Maybe<Scalars["String"]>;
  readonly rss: Maybe<Scalars["String"]>;
  readonly siteUrl: Maybe<Scalars["String"]>;
  readonly social: Maybe<ReadonlyArray<Maybe<SiteSiteMetadataSocial>>>;
  readonly title: Maybe<Scalars["String"]>;
};

export type SiteSiteMetadataAuthor = {
  readonly __typename?: "SiteSiteMetadataAuthor";
  readonly name: Maybe<Scalars["String"]>;
};

export type SiteSiteMetadataAuthorFilterInput = {
  readonly name: Maybe<StringQueryOperatorInput>;
};

export type SiteSiteMetadataFilterInput = {
  readonly author: Maybe<SiteSiteMetadataAuthorFilterInput>;
  readonly description: Maybe<StringQueryOperatorInput>;
  readonly disqus: Maybe<StringQueryOperatorInput>;
  readonly language: Maybe<StringQueryOperatorInput>;
  readonly repository: Maybe<StringQueryOperatorInput>;
  readonly rss: Maybe<StringQueryOperatorInput>;
  readonly siteUrl: Maybe<StringQueryOperatorInput>;
  readonly social: Maybe<SiteSiteMetadataSocialFilterListInput>;
  readonly title: Maybe<StringQueryOperatorInput>;
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
  readonly glob: Maybe<Scalars["String"]>;
  readonly in: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
  readonly ne: Maybe<Scalars["String"]>;
  readonly nin: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
  readonly regex: Maybe<Scalars["String"]>;
};

export type TransformOptions = {
  readonly cropFocus: Maybe<ImageCropFocus>;
  readonly duotone: Maybe<DuotoneGradient>;
  readonly fit: Maybe<ImageFit>;
  readonly grayscale: Maybe<Scalars["Boolean"]>;
  readonly rotate: Maybe<Scalars["Int"]>;
  readonly trim: Maybe<Scalars["Float"]>;
};

export type WebPOptions = {
  readonly quality: Maybe<Scalars["Int"]>;
};
